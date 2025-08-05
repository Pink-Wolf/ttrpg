using System.Text.Json;
using ttrpg.server.Model;
using ttrpg.server.Tools;

namespace ttrpg.server.Data
{
    public class Database
    {
        const string dataPath = "Data/";
        const string destinyPath = $"{dataPath}destiny/";
        const string originPath = $"{dataPath}origin/";

        public static readonly JsonSerializerOptions jsonOptions = new()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        };

        private async Task<string?> GetFast(string path, string name)
        {
            path = $"{path}{name}.json";
            if (File.Exists(path) is false) return null;

            var json = await File.ReadAllTextAsync(path);

            name = Thread.CurrentThread.CurrentCulture.TextInfo.ToTitleCase(name);
            var encodedName = name.Replace("\"", "\\\"");
            var nameIndex = json.IndexOf('{') + 1;
            json = $"{{\n  \"name\": \"{encodedName}\",{json[nameIndex..]}";

            return json;
        }
        public async Task<T?> Get<T>(string path, string name)
            where T : class
        {
            path = $"{path}{name}.json";
            if (File.Exists(path) is false) return null;

            var json = (await JsonSerializer.DeserializeAsync<T>(new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read), jsonOptions))!;

            name = Thread.CurrentThread.CurrentCulture.TextInfo.ToTitleCase(name);
            typeof(T).GetProperty("Name")!.SetValue(json, name);

            return json;
        }

        public async Task<string> GetAllFast(string path)
        {
            var names = Directory.GetFiles(path, "*.json", SearchOption.AllDirectories);
            for (int i = 0; i < names.Length; ++i)
            {
                names[i] = names[i][path.Length..^5];
            }

            var results = new object[names.Length];
            for (int i = 0; i < results.Length; ++i)
            {
                results[i] = GetFast(path, names[i]);
            }
            for (int i = 0; i < results.Length; ++i)
            {
                var destiny = await (Task<string>)results[i];
                results[i] = $"\"{URIEncoder.Encode(names[i])}\": {destiny}";
            }
            return $"{{\n{string.Join(",\n", results)}\n}}";
        }
        public async Task<IDictionary<string, T>> GetAll<T>(string path)
            where T : class
        {
            var names = Directory.GetFiles(path, "*.json", SearchOption.AllDirectories);
            for (int i = 0; i < names.Length; ++i)
            {
                names[i] = names[i][path.Length..^5];
            }

            var results = new object[names.Length];
            for (int i = 0; i < names.Length; ++i)
            {
                results[i] = Get<T>(path, names[i]);
            }
            for (int i = 0; i < names.Length; ++i)
            {
                results[i] = await (Task<T>)results[i];
            }
            return names
                .Zip(results, (key, value) => KeyValuePair.Create(URIEncoder.Encode(key), (T)value))
                .ToDictionary()
            ;
        }

        public Task<string?> GetDestinyFast(string name) => GetFast(destinyPath, name);
        public Task<Destiny?> GetDestiny(string name) => Get<Destiny>(destinyPath, name);
        public Task<string> GetAllDestiniesFast() => GetAllFast(destinyPath);
        public Task<IDictionary<string, Destiny>> GetAllDestinies() => GetAll<Destiny>(destinyPath);
        
        public Task<string?> GetOriginFast(string name) => GetFast(originPath, name);
        public Task<Origin?> GetOrigin(string name) => Get<Origin>(originPath, name);
        public Task<string> GetAllOriginsFast() => GetAllFast(originPath);
        public Task<IDictionary<string, Origin>> GetAllOrigins() => GetAll<Origin>(originPath);
    }
}
