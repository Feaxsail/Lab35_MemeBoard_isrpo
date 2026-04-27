using MemesApi.Models;

namespace MemesApi.Data;

public static class MemesStore
{
    private static int _nextId = 4;

    public static List<Meme> Memes { get; } = new()
    {
        new Meme
        {
            Id = 1,
            Title = "Жду дедлайн",
            Category = "учёба",
            Rating = 5,
            AddedAt = DateTime.UtcNow.AddDays(-10)
        },
        new Meme
        {
            Id = 2,
            Title = "Баг в коде",
            Category = "программирование",
            Rating = 4,
            AddedAt = DateTime.UtcNow.AddDays(-5)
        },
        new Meme
        {
            Id = 3,
            Title = "Кофе спасёт мир",
            Category = "жизнь",
            Rating = 5,
            AddedAt = DateTime.UtcNow.AddDays(-2)
        }
    };

    public static int NextId()
    {
        return _nextId++;
    }
}