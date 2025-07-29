using System.Text.Json;
using ttrpg.server.Model;
using ttrpg.server.Tools;

namespace ttrpg.server.Data
{
    public class Database
    {
        const string dataPath = "Data/";
        const string destinyPath = $"{dataPath}destiny/";

        public static readonly JsonSerializerOptions jsonOptions = new()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        };

        public async Task<string?> GetDestinyFast(string name)
        {
            var path = $"{destinyPath}{name}.json";
            if (File.Exists(path) is false) return null;

            var json = await File.ReadAllTextAsync(path);

            name = Thread.CurrentThread.CurrentCulture.TextInfo.ToTitleCase(name);
            var encodedName = name.Replace("\"", "\\\"");
            var nameIndex = json.IndexOf('{') + 1;
            json = $"{{\n  \"name\": \"{encodedName}\",{json[nameIndex..]}";

            return json;
        }
        public async Task<Destiny?> GetDestiny(string name)
        {
            var path = $"{destinyPath}{name}.json";
            if (File.Exists(path) is false) return null;

            var json = (await JsonSerializer.DeserializeAsync<Destiny>(new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read), jsonOptions))!;

            name = Thread.CurrentThread.CurrentCulture.TextInfo.ToTitleCase(name);
            json.Name = name;

            return json;
        }


        public async Task<string> GetAllDestiniesFast()
        {
            var names = Directory.GetFiles(destinyPath, "*.json", SearchOption.AllDirectories);
            for (int i = 0; i < names.Length; ++i)
            {
                names[i] = names[i][destinyPath.Length..^5];
            }

            var results = new object[names.Length];
            for (int i = 0; i < results.Length; ++i)
            {
                results[i] = GetDestinyFast(names[i]);
            }
            for (int i = 0; i < results.Length; ++i)
            {
                var article = await (Task<string>)results[i];
                results[i] = $"\"{URIEncoder.Encode(names[i])}\": {article}";
            }
            return $"{{\n{string.Join(",\n", results)}\n}}";
        }
        public async Task<IDictionary<string, Destiny>> GetAllDestinies()
        {
            var names = Directory.GetFiles(destinyPath, "*.json", SearchOption.AllDirectories);
            for (int i = 0; i < names.Length; ++i)
            {
                names[i] = names[i][destinyPath.Length..^5];
            }

            var results = new object[names.Length];
            for (int i = 0; i < names.Length; ++i)
            {
                results[i] = GetDestiny(names[i]);
            }
            for (int i = 0; i < names.Length; ++i)
            {
                results[i] = await (Task<Destiny>)results[i];
            }
            return names
                .Zip(results, (key, value) => KeyValuePair.Create(URIEncoder.Encode(key), (Destiny)value))
                .ToDictionary()
            ;
        }
    }
}
