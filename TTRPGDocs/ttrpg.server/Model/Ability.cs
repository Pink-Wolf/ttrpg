#pragma warning disable CS8618

namespace ttrpg.server.Model
{
    public class Ability : IEquatable<Ability>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string? Frequency { get; set; }
        public string? Reaction { get; set; }
        public string? Target { get; set; }
        public string? Skill {  get; set; }
        public string? Bonus { get; set; }
        public AbilityConsequence? Consequences { get; set; }

        public override int GetHashCode() => HashCode.Combine(Name
            , Description
            , Frequency
            , Reaction
            , Target
            , Skill
            , Bonus
            , Consequences
        );
        public bool Equals(Ability? other) => other is not null
            && Name == other.Name
            && Description == other.Description
            && Frequency == other.Frequency
            && Reaction == other.Reaction
            && Target == other.Target
            && Skill == other.Skill
            && Bonus == other.Bonus
            && Consequences == other.Consequences
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

    public class AbilityConsequence : IEquatable<AbilityConsequence>
    {
        public string Minor { get; set; }
        public string Medium { get; set; }
        public string Major { get; set; }

        public override int GetHashCode() => HashCode.Combine(Minor, Medium, Major);
        public bool Equals(AbilityConsequence? other) => other is not null
            && Minor == other.Minor
            && Medium == other.Medium
            && Major == other.Major
        ;
        public override bool Equals(object? obj) => obj is AbilityConsequence other
            && Equals(other)
        ;

        public static bool operator ==(AbilityConsequence? lhs, AbilityConsequence? rhs)
            => lhs is null
                ? rhs is null
                : lhs.Equals(rhs)
        ;
        public static bool operator !=(AbilityConsequence? lhs, AbilityConsequence? rhs) => !(lhs == rhs);
    }
}
