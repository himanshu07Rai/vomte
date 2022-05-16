const express = require("express");
const cors = require("cors");
const createError = require("http-errors");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/api", (req, res) => {
  res.status(200).send("🚀 Server running 🚀");
});

app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/auth", require("./routes/auth"));

app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
