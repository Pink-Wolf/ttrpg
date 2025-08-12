#pragma warning disable CS8618

namespace ttrpg.server.Model
{
    public class Tool : IEquatable<Tool>
    {
        public string Name { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public List<Ability> Abilities { get; set; }
        public string? Level { get; set; }
        public string? Price { get; set; }
        public string? Rarity { get; set; }

        public override int GetHashCode() => Name.GetHashCode();
        public bool Equals(Tool? other) => other is not null
            && Name == other.Name
            && Summary == other.Summary
            && Description == other.Description
            && Abilities == other.Abilities
            && Level == other.Level
            && Price == other.Price
            && Rarity == other.Rarity
        ;
        public override bool Equals(object? obj) => obj is Tool other
            && Equals(other)
        ;

        public static bool operator ==(Tool? lhs, Tool? rhs)
            => lhs is null
                ? rhs is null
                : lhs.Equals(rhs)
        ;
        public static bool operator !=(Tool? lhs, Tool? rhs) => !(lhs == rhs);
    }
}
