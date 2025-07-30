using System.Text;
using System.Web;

namespace ttrpg.server.Tools
{
    public static class URIEncoder
    {
        public static string Encode(string str)
        {
            str = HttpUtility.UrlEncode(str);

            StringBuilder sb = new(str.Length);
            int encodedAmount = 0;
            for (int index = 0; index < str.Length; ++index) {
                var c = str[index];

                if ("!'()*:".Contains(c))
                {
                    sb.Append(str[encodedAmount..index]);
                    sb.Append('%');
                    sb.Append(((int)c).ToString("X2"));

                    encodedAmount = index + 1;
                }
            }
            sb.Append(str[encodedAmount..^0]);

            return sb.ToString();
        }
        public static string Decode(string str)
            => DecodeControllerArg(HttpUtility.UrlDecode(str));
        public static string DecodeControllerArg(string str) => str
            .Replace('+', ' ')
        ;
    }
}
