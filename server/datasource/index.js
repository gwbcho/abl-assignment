const { Worker } = require("worker_threads");
const assert = require("assert");

const newDataSource = ({
  eventsPerSecond,
  scale = 1,
  freq = 1,
  offset = 0,
  sourceName
}) => {
  assert(eventsPerSecond < 1000 && eventsPerSecond > 0);
  const worker = new Worker(`${__dirname}/datasource.js`, {
    workerData: { eventsPerSecond, sourceName, freq, scale, offset }
  });

  return worker;
};

module.exports = newDataSource;
