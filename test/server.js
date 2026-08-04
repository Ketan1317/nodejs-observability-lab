const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Service is running");
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString()
    });
});

app.get("/slow", async (req, res) => {

    await new Promise(resolve =>
        setTimeout(resolve, 3000)
    );

    res.status(200).json({
        status: "SLOW"
    });
});

app.get("/error", (req, res) => {
    res.status(500).json({
        status: "ERROR"
    });
});

app.listen(3000, () => {
    console.log("Test service running on port 3000");
});