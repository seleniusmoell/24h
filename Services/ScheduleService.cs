using System.Text.Json;
using System.Text.Json.Serialization;
using _24hKlimatet.Models;

namespace _24hKlimatet.Services;

public class ScheduleService
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        Converters = { new JsonStringEnumConverter() }
    };

    public IReadOnlyList<ScheduleItem> Schedule { get; }

    public ScheduleService(IWebHostEnvironment env)
    {
        var path = Path.Combine(env.ContentRootPath, "schedule.json");
        var json = File.ReadAllText(path);
        Schedule = JsonSerializer.Deserialize<List<ScheduleItem>>(json, JsonOptions)!;
    }

    public ScheduleItem? GetCurrent(DateTime now) =>
        Schedule.FirstOrDefault(s => s.IsActive(now));

    public IReadOnlyList<ScheduleItem> GetAllDay() =>
        Schedule.Where(s => s.AllDay).ToList();

    public IReadOnlyList<ScheduleItem> GetAllCurrent(DateTime now) =>
        Schedule.Where(s => !s.AllDay && s.IsActive(now)).ToList();

    public IEnumerable<IReadOnlyList<ScheduleItem>> GetGrouped()
    {
        var sorted = Schedule.Where(s => !s.AllDay).OrderBy(s => s.Start).ThenBy(s => s.End).ToList();
        if (sorted.Count == 0) yield break;

        var group = new List<ScheduleItem>();
        var groupEnd = DateTime.MinValue;

        foreach (var item in sorted)
        {
            if (group.Count > 0 && item.Start >= groupEnd)
            {
                yield return group.AsReadOnly();
                group = new List<ScheduleItem>();
                groupEnd = DateTime.MinValue;
            }
            group.Add(item);
            if (item.End > groupEnd) groupEnd = item.End;
        }

        if (group.Count > 0) yield return group.AsReadOnly();
    }

    public IEnumerable<IReadOnlyList<ScheduleItem>> GetUpcomingGroups(DateTime now, int count = 2) =>
        GetGrouped().Where(g => g.All(s => s.Start > now)).Take(count);

    public IEnumerable<ScheduleItem> GetAll() => Schedule;
}
