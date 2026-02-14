function asyncWrapper(promise) {
  return promise
    .then((data) => Promise.resolve([undefined, data]))
    .catch((error) => Promise.resolve([error]));
}

module.exports = asyncWrapper;
