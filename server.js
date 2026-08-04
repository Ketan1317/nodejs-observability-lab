const express = require("express");
const doSomeHeavyTask = require("./util");
const client = require("prom-client");
const responseTime = require("response-time");
const LokiTransport = require("winston-loki");
const { createLogger, transports } = require("winston");

const options = {
  transports: [
    new LokiTransport({
      host: "http://127.0.0.1:3100",
    }),
  ],
};

const logger = createLogger(options);

const app = express();
const PORT = process.env.PORT || 8000;

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

const reqResTime = new client.Histogram({
  name: "http_req_res_time",
  help: "This tells how much time is taken by req and res",
  labelNames: ["method", "route", "statusCode"],
  buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000],
});

const reqCounter = new client.Counter({
  name: "Total_request_count",
  help: "This tells how many req have been requested",
});

app.use(
  responseTime((req, res, time) => {
    reqCounter.inc();
    reqResTime
      .labels({
        method: req.method,
        route: req.url,
        statusCode: res.statusCode,
      })
      .observe(time);
  }),
);

app.get("/", (req, res) => {
  logger.info("Req came on / route");
  return res.json({ message: "Hello From Express Server" });
});
app.get("/metrics", async (req, res) => {
  logger.info("Req came on /metric route");

  res.setHeader("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});
app.get("/slow", async (req, res) => {
  try {
    logger.info("Req came on /slow route");

    const timeTaken = await doSomeHeavyTask();
    return res.json({
      status: "Success",
      message: `Heavy task in completed in ${timeTaken}ms`,
    });
  } catch (error) {
    logger.error(error.message)
    return res
      .status(500)
      .json({ status: "Error", error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Express Server Started at PORT : ${PORT}`);
});
