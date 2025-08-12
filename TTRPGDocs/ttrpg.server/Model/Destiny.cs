#pragma warning disable CS8618

using System.Linq;

namespace ttrpg.server.Model
{
    public class Destiny : IEquatable<Destiny>
    {
        public string Name { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public List<DestinyPlaystyle> Playstyles { get; set; }
        public Dictionary<string, List<Ability>> Abilities { get; set; }

        private class AbilitiesComparer : IEqualityComparer<KeyValuePair<string, List<Ability>>>
        {
            public bool Equals(KeyValuePair<string, List<Ability>> x, KeyValuePair<string, List<Ability>> y)
                => x.Key == y.Key
                && (x.Value?.SequenceEqual(y.Value) ?? (y.Value is null));

            public int GetHashCode(KeyValuePair<string, List<Ability>> obj) => obj.Key.GetHashCode();
        }

        public override int GetHashCode() => Name.GetHashCode();
        public bool Equals(Destiny? other) => other is not null
            && Name == other.Name
            && Summary == other.Summary
            && Description == other.Description
            && Playstyles.SequenceEqual(other.Playstyles)
            && Abilities.SequenceEqual(other.Abilities, new AbilitiesComparer())
        ;
        public override bool Equals(object? obj) => obj is Destiny other
            && Equals(other)
        ;

        public static bool operator ==(Destiny? lhs, Destiny? rhs)
            => lhs is null
                ? rhs is null
                : lhs.Equals(rhs)
        ;
        public static bool operator !=(Destiny? lhs, Destiny? rhs) => !(lhs == rhs);
    }

    public class DestinyPlaystyle : IEquatable<DestinyPlaystyle>
    {
        public string Title { get; set; }
        public string Description { get; set; }

        public override int GetHashCode() => HashCode.Combine(Title
            , Description
        );
        public bool Equals(DestinyPlaystyle? other) => other is not null
            && Title == other.Title
            && Description == other.Description
        ;
        public override bool Equals(object? obj) => obj is DestinyPlaystyle other
            && Equals(other)
        ;

        public static bool operator ==(DestinyPlaystyle? lhs, DestinyPlaystyle? rhs)
            => lhs is null
                ? rhs is null
                : lhs.Equals(rhs)
        ;
        public static bool operator !=(DestinyPlaystyle? lhs, DestinyPlaystyle? rhs) => !(lhs == rhs);
    }
}
#pragma warning restore
