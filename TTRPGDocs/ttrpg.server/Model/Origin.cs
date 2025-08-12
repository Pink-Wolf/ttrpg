#pragma warning disable CS8618

namespace ttrpg.server.Model
{
    public class Origin : IEquatable<Origin>
    {
        public string Name { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public Dictionary<string, string>? Attributes { get; set; }
        public Dictionary<string, string>? Skills { get; set; }
        public List<Ability>? Abilities { get; set; }
        public List<Origin>? Suborigins { get; set; }

        public override int GetHashCode() => Name.GetHashCode();
        public bool Equals(Origin? other) => other is not null
            && Name == other.Name
            && Summary == other.Summary
            && Description == other.Description
            && (Attributes?.SequenceEqual(other.Attributes ?? []) ?? (other.Attributes is null))
            && (Skills?.SequenceEqual(other.Skills ?? []) ?? (other.Skills is null))
            && (Abilities?.SequenceEqual(other.Abilities ?? []) ?? (other.Abilities is null))
            && (Suborigins?.SequenceEqual(other.Suborigins ?? []) ?? (other.Suborigins is null))
        ;
        public override bool Equals(object? obj) => obj is Origin other
            && Equals(other)
        ;

        public static bool operator ==(Origin? lhs, Origin? rhs)
            => lhs is null
                ? rhs is null
                : lhs.Equals(rhs)
        ;
        public static bool operator !=(Origin? lhs, Origin? rhs) => !(lhs == rhs);
    }
}
