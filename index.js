const express = require("express");

const app = express();

app.get("/api", (req, res) => {
  res.status(200).json({ message: "gg" });
});

app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("bitch");
});
