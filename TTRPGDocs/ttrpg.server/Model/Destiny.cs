#pragma warning disable CS8618
namespace ttrpg.server.Model
{
    public class Destiny : IEquatable<Destiny>
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public override int GetHashCode() => HashCode.Combine(Name
            , Description
        );
        public bool Equals(Destiny? other) => other is not null
            && Name == other.Name
            && Description == other.Description
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
}
#pragma warning restore
