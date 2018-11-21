import React from 'react';

import SqlContainer from '../components/SqlContainer';

export default (route: string, msg: string, sqlList?: string[]) => {
  if (!sqlList) {
    return null;
  }

  return sqlList.map((sql, i) => (
    <SqlContainer
      key={sql}
      sql={sql}
      route={`${route}/${i}`}
      successMsg={msg}
    />
  ));
};
