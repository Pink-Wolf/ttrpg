using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using ttrpg.server.Model;
using ttrpg.server.Tools;

namespace ttrpg.server.Data
{
    public partial class Database
    {
        const string dataPath = "Data/";
        const string destinyPath = $"{dataPath}destiny/";
        const string originPath = $"{dataPath}origin/";

        public static readonly JsonSerializerOptions jsonOptions = new()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true,
            DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull,
        };

        [GeneratedRegex(@"""name""\s*:\s*""")]
        private static partial Regex NameRegex();

        private Task<string?> GetFast(string path, string name)
        {
            path = $"{path}{name}.json";
            if (File.Exists(path) is false) return Task.FromResult<string?>(null);
            return File.ReadAllTextAsync(path)!;
        }
        public Task<T?> Get<T>(string path, string name)
            where T : class
        {
            path = $"{path}{name}.json";
            if (File.Exists(path) is false) return Task.FromResult<T?>(null);

            return JsonSerializer.DeserializeAsync<T>(
                new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read)
                , jsonOptions
            ).AsTask();
        }

        public async Task<string> GetAllFast(string path)
        {
            var elements = Directory.GetFiles(path, "*.json", SearchOption.AllDirectories)
                .Select(filePath => filePath[path.Length..^5])
                .Select(name => (name, value: GetFast(path, name)))
            ;
            StringBuilder sb = new("{\n");
            foreach (var item in elements)
            {
                sb.Append('"');
                sb.Append(item.name);
                sb.Append("\": ");
                sb.AppendLine(await item.value);
            }
            sb.Append('}');
            return sb.ToString();
        }
        public async Task<IDictionary<string, T>> GetAll<T>(string path)
            where T : class
        {
            var results = await Directory.GetFiles(path, "*.json", SearchOption.AllDirectories)
                .Select(filePath => filePath[path.Length..^5])
                .SelectAsync(async name => (name, (await Get<T>(path, name))!))
            ;

            return results.ToDictionary();
        }

        public Task Set(string path, string data, out string name)
        {
            var match = NameRegex().Match(data);
            var nameStart = match.Index + match.Length;
            var nameEnd = nameStart;
            for (; nameEnd < data.Length; ++nameEnd)
            {
                switch (data[nameEnd])
                {
                    case '\\':
                        ++nameEnd;
                        continue;
                    default: continue;
                    case '"':
                        break;
                }
                break;
            }
            name = Regex.Unescape(data[nameStart..nameEnd]).Replace(' ', '+').ToLower();
            path = $"{path}{name}.json";

            return File.WriteAllTextAsync(path, data);
        }
        public Task Set<T>(string path, T data, out string name)
            => Set(path, JsonSerializer.Serialize(data, jsonOptions), out name);

        public Task<string?> GetDestinyFast(string name) => GetFast(destinyPath, name);
        public Task<Destiny?> GetDestiny(string name) => Get<Destiny>(destinyPath, name);
        public Task<string> GetAllDestiniesFast() => GetAllFast(destinyPath);
        public Task<IDictionary<string, Destiny>> GetAllDestinies() => GetAll<Destiny>(destinyPath);
        public Task SetDestiny(string data, out string name) => Set(destinyPath, data, out name);
        public Task SetDestiny(Destiny data, out string name) => Set(destinyPath, data, out name);


        public Task<string?> GetOriginFast(string name) => GetFast(originPath, name);
        public Task<Origin?> GetOrigin(string name) => Get<Origin>(originPath, name);
        public Task<string> GetAllOriginsFast() => GetAllFast(originPath);
        public Task<IDictionary<string, Origin>> GetAllOrigins() => GetAll<Origin>(originPath);
        public Task SetOrigin(string data, out string name) => Set(originPath, data, out name);
        public Task SetOrigin(Origin data, out string name) => Set(originPath, data, out name);
    }
}
