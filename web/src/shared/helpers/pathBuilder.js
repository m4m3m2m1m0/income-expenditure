import buildUrl from 'build-url';

const pathBuilder = (path, queryParams, fragment, pathParams) => {
  console.log(queryParams);
  let fullPath = buildUrl('', {
    path: path,
    hash: fragment,
    queryParams: queryParams,
  });

  if (fullPath.includes('/http', 0)) {
    fullPath = fullPath.substr(1, fullPath.length - 1);
  }

  if (pathParams) {
    for (let key in pathParams) {
      fullPath = fullPath.replace(`:${key}`, pathParams[key]);
    }
  }

  return fullPath;
};

export default pathBuilder;
