namespace _24hKlimatet.Models;

public enum SessionType { Opening, Talk, Panel, Workshop, Break, Performance, Demonstration, Exhibition }

public record ScheduleItem(
    string Title,
    string? Subtitle,
    string? Speaker,
    string? Location,
    DateTime Start,
    DateTime End,
    SessionType Type,
    string? Description = null,
    string? ImageUrl = null,
    bool AllDay = false
)
{
    public bool IsActive(DateTime now) => now >= Start && now < End;
    public bool IsPast(DateTime now) => now >= End;
    public TimeSpan Duration => End - Start;
}
