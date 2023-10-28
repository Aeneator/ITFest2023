const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.use("api/users", usersRoutes);

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

mongoose
  .connect(
    "mongodb+srv://david-moise_08:Q12NKgyRGchK6pFK@cluster0.bqkgy7a.mongodb.net/itFest?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
