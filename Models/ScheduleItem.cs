namespace _24hKlimatet.Models;

public enum SessionType { Opening, Talk, Panel, Workshop, Break, Performance, Demonstration }

public record ScheduleItem(
    string Title,
    string? Subtitle,
    string? Speaker,
    string? Location,
    DateTime Start,
    DateTime End,
    SessionType Type
)
{
    public bool IsActive(DateTime now) => now >= Start && now < End;
    public bool IsPast(DateTime now) => now >= End;
    public TimeSpan Duration => End - Start;
}
