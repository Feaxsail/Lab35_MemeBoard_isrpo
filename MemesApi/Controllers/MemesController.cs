using Microsoft.AspNetCore.Mvc;
using MemesApi.Models;
using MemesApi.Data;

namespace MemesApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MemesController : ControllerBase
{
    // GET /api/memes
    [HttpGet]
    public ActionResult<List<Meme>> GetAll()
    {
        return Ok(MemesStore.Memes);
    }

    // GET /api/memes/1
    [HttpGet("{id}")]
    public ActionResult<Meme> GetById(int id)
    {
        var meme = MemesStore.Memes.FirstOrDefault(m => m.Id == id);
        if (meme is null)
        {
            return NotFound(new { message = $"Мем с id={id} не найден" });
        }
        return Ok(meme);
    }

    // POST /api/memes
    [HttpPost]
    public ActionResult<Meme> Create([FromBody] Meme meme)
    {
        if (string.IsNullOrWhiteSpace(meme.Title))
        {
            return BadRequest(new { message = "Название мема не может быть пустым" });
        }
        if (meme.Rating < 1 || meme.Rating > 5)
        {
            return BadRequest(new { message = "Рейтинг должен быть от 1 до 5" });
        }

        meme.Id = MemesStore.NextId();
        meme.AddedAt = DateTime.UtcNow;
        MemesStore.Memes.Add(meme);
        return CreatedAtAction(nameof(GetById), new { id = meme.Id }, meme);
    }

    // DELETE /api/memes/1
    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        var meme = MemesStore.Memes.FirstOrDefault(m => m.Id == id);
        if (meme is null)
        {
            return NotFound(new { message = $"Мем с id={id} не найден" });
        }
        MemesStore.Memes.Remove(meme);
        return NoContent();
    }
}