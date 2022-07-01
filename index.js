const express = require("express");
const cors = require("cors");
const path = require("path");
const createError = require("http-errors");
require("dotenv").config();

const app = express();

app.use(express.json());

const corsOptions = { origin: "*" };
app.use(cors(corsOptions));

app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/api", (req, res) => {
  res.status(200).send("🚀 Server running 🚀");
});

app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/poll", require("./routes/polls"));
app.use("/api/vote", require("./routes/vote"));

app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  // console.log(err.message);
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Running on port ${PORT} 🚀`);
});
