#pragma warning disable CS8618

namespace ttrpg.server.Model
{
    public class Ability : IEquatable<Ability>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string? Frequency { get; set; }
        public string? Time { get; set; }
        public string? Reaction { get; set; }
        public string? Target { get; set; }
        public string? Skill {  get; set; }
        public string? Bonus { get; set; }

        public override int GetHashCode() => Name.GetHashCode();
        public bool Equals(Ability? other) => other is not null
            && Name == other.Name
            && Description == other.Description
            && Frequency == other.Frequency
            && Time == other.Time
            && Reaction == other.Reaction
            && Target == other.Target
            && Skill == other.Skill
            && Bonus == other.Bonus
        ;
        public override bool Equals(object? obj) => obj is Ability other
            && Equals(other)
        ;

        public static bool operator ==(Ability? lhs, Ability? rhs)
            => lhs is null
                ? rhs is null
                : lhs.Equals(rhs)
        ;
        public static bool operator !=(Ability? lhs, Ability? rhs) => !(lhs == rhs);
    }
}
