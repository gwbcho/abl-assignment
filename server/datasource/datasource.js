const { workerData, parentPort } = require("worker_threads");
const {
  eventsPerSecond,
  sourceName,
  freq = 1,
  scale = 1,
  offset = 0
} = workerData;

const interval = 1000 / eventsPerSecond;
const t0 = Date.now();

const getVal = () => {
  elapsed = Date.now() - t0;
  const jitter = (Math.random() - 0.5) * 0.25;
  const val =
    scale * Math.sin(((2 * Math.PI) / (freq * 1000)) * elapsed) + offset;
  return val + jitter;
};

setInterval(
  () =>
    parentPort.postMessage(
      JSON.stringify({ ts: Date.now(), val: getVal(), sourceName })
    ),
  interval
);
