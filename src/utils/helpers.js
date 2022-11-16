const search = (array, query, setArray, fieldName) => {
  const filteredResult = [];
  for (const item of array) {
    if (item[fieldName].contains(query)) filteredResult.push(item);
  }

  setArray(filteredResult);
};

export { search };
