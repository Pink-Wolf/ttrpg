using Microsoft.AspNetCore.Mvc;
using ttrpg.server.Data;
using ttrpg.server.Tools;

namespace ttrpg.server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DestinyController : Controller
    {
        readonly Database data = new();

        [HttpGet("{path}")]
        [ProducesResponseType(200), ProducesResponseType(404)]
        public async Task<ActionResult<string>> GetArticle(string path)
        {
            path = URIEncoder.DecodeControllerArg(path);
            var result = await data.GetDestinyFast(path);
            if (result is null) return NotFound();
            return result;
        }

        [HttpGet("")]
        [ProducesResponseType(200)]
        public Task<string> GetArticles()
            => data.GetAllDestiniesFast();
    }
}
