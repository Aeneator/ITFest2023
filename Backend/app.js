const express = require("express");
const cors = require("cors");

const HttpError = require("./models/http-error");

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res, next) => {
  res.json({ message: "Successful" });
});

app.use((req, res, next) => {
  const error = new HttpError("Route not found", 404);
  next(error);
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
