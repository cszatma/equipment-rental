import React from 'react';

import { Result } from '@/types';
import QueryItem from '@components/QueryItem';

export default (
  route: string,
  queries?: string[],
  results?: Result[],
  errors?: any[],
) => {
  if (!queries) {
    return null;
  }

  console.log(results);

  return queries.map((query, i) => (
    <QueryItem
      key={query}
      query={query}
      route={`${route}/${i}`}
      result={results && results[i]}
      error={errors && errors[i]}
    />
  ));
};
