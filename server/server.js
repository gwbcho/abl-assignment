const WebSocket = require("ws");
const newDataSource = require("./datasource");

const registerDataSource = (ds, ws) => {
  ds.on("message", msg => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(msg);
    }
  });
};

const primaryDs = newDataSource({
  eventsPerSecond: 100,
  sourceName: "A",
  scale: 1,
  offset: 0
});

const secondaryDs = newDataSource({
  eventsPerSecond: 10,
  sourceName: "B",
  freq: 2,
  scale: 3,
  offset: 3
});

const tertiaryDs = newDataSource({
  eventsPerSecond: 50,
  sourceName: "C",
  freq: 0.5,
  scale: 1.5,
  offset: -1
});

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", ws => {
  registerDataSource(primaryDs, ws);
  console.log("Client connected");
  ws.on("close", () => console.log("Client disconnected"));

  if (process.env.ENV !== "DEV") {
    setTimeout(() => registerDataSource(secondaryDs, ws), 5000);
    setTimeout(() => registerDataSource(tertiaryDs, ws), 10000);
  }
});

console.log("WebSocket server started on port 8080");
