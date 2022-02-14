/**
 * @param {Array}  Schedule Schedule List
 */

const filterSelectedSchedule = (schedule) => {
  let tmp = [];

  tmp = schedule.filter((item) => {
    return item.status;
  });

  return tmp;
};

export {filterSelectedSchedule};
