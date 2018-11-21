export default <T>(results: T | T[]): T[] =>
  Array.isArray(results) ? results : [results];
