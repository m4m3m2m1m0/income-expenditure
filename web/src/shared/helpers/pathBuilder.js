const pathBuilder = (path, queryParams, pathParams, fragment) => {
  let fullPath = path;

  if (queryParams) {
    let firstParam = true;
    for (let key in queryParams) {
      if (typeof queryParams[key] !== 'object') {
        fullPath = `${fullPath}${firstParam ? '?' : '&'}${key}=${
          queryParams[key]
        }`;
        firstParam = false;
      }
    }
  }

  if (pathParams) {
    for (let key in pathParams) {
      fullPath = fullPath.replace(`:${key}`, pathParams[key]);
    }
  }

  if (Array.isArray(fragment)) {
    fragment.forEach((f) => {
      fullPath = `${fullPath}#${f}`;
    });
  }

  return fullPath;
};

export default pathBuilder;
