using System.Text.Json;
using ttrpg.server.Data;
using ttrpg.server.Model;

namespace ttrpg.server.test
{
    public class DatabaseTests
    {
        public Database database;

        [SetUp]
        public void Setup()
        {
            database = new();
        }

        [Test]
        public async Task GetAllDestiniesFast()
        {
            var actual = JsonSerializer.Deserialize<IDictionary<string, Destiny>>(await database.GetAllDestiniesFast(), Database.jsonOptions);
            var expected = await database.GetAllDestinies();

            Assert.That(actual, Is.EquivalentTo(expected));
        }
    }
}