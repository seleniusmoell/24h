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

    public IEnumerable<ScheduleItem> GetUpcoming(DateTime now, int count = 2) =>
        Schedule.Where(s => now < s.Start).Take(count);

    public IEnumerable<ScheduleItem> GetAll() => Schedule;
}
