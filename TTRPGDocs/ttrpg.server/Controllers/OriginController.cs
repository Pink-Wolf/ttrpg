using Microsoft.AspNetCore.Mvc;
using ttrpg.server.Data;
using ttrpg.server.Model;
using ttrpg.server.Tools;

namespace ttrpg.server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OriginController : Controller
    {
        readonly Database data = new();

        [HttpGet("{path}")]
        [ProducesResponseType(200), ProducesResponseType(404)]
        public async Task<ActionResult<string>> GetOrigin(string path)
        {
            path = URIEncoder.DecodeControllerArg(path);
            var result = await data.GetOriginFast(path);
            if (result is null) return NotFound();
            return result;
        }

        [HttpGet("")]
        [ProducesResponseType(200)]
        public Task<string> GetAllOrigins()
            => data.GetAllOriginsFast();

        [HttpPost()]
        [ProducesResponseType(201)]
        public async Task<ActionResult<Origin>> SetOrigin([FromBody] Origin value)
        {
            await data.SetOrigin(value, out var name);
            return CreatedAtAction(nameof(GetOrigin), new { path = name }, value);
        }
    }
}
