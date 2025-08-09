namespace ttrpg.server.Tools
{
    public static class LinqExtensions
    {
        public static async Task<IEnumerable<TResult>> SelectAsync<TSource, TResult>(this IEnumerable<TSource> source, Func<TSource, int, Task<TResult>> selector)
        {
            object[] result = [.. source.Select(x => (object)x!)];
            for (int i = 0; i < result.Length; ++i)
                result[i] = (await selector((TSource)result[i]!, i))!;
            return result.Select(x => (TResult)x);
        }
        public static async Task<IEnumerable<TResult>> SelectAsync<TSource, TResult>(this IEnumerable<TSource> source, Func<TSource, Task<TResult>> selector)
        {
            object[] result = [.. source.Select(x => (object)x!)];
            for (int i = 0; i < result.Length; ++i)
                result[i] = (await selector((TSource)result[i]!))!;
            return result.Select(x => (TResult)x);
        }
    }
}
