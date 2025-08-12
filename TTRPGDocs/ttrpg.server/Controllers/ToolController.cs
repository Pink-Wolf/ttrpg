using Microsoft.AspNetCore.Mvc;
using ttrpg.server.Data;
using ttrpg.server.Model;
using ttrpg.server.Tools;

namespace ttrpg.server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToolController : Controller
    {
        readonly Database data = new();

        [HttpGet("{path}")]
        [ProducesResponseType(200), ProducesResponseType(404)]
        public async Task<ActionResult<string>> GetTool(string path)
        {
            path = URIEncoder.DecodeControllerArg(path);
            var result = await data.GetToolFast(path);
            if (result is null) return NotFound();
            return result;
        }

        [HttpGet("")]
        [ProducesResponseType(200)]
        public Task<string> GetAllTools()
            => data.GetAllToolsFast();

        [HttpPost()]
        [ProducesResponseType(201)]
        public async Task<ActionResult<Tool>> SetTool([FromBody] Tool value)
        {
            await data.SetTool(value, out var name);
            return CreatedAtAction(nameof(GetTool), new { path = name }, value);
        }
    }
}
