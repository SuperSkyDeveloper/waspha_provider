export const filterPromos = (data, type) => {
  let filterData = [];

  filterData = data.filter((item) => {
    return item.type === type;
  });

  return filterData;
};
