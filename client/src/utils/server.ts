import axios from 'axios';

import Result from '@/types/Result';

const rootUrl = '/api';

const get = (route: string): Promise<string | string[]> =>
  axios.get(`${rootUrl}${route}`).then(res => res.data);

const post = (route: string): Promise<Result | Result[]> =>
  axios.post(`${rootUrl}${route}`).then(res => res.data);

export default { get, post };
