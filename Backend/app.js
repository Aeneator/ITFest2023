const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

const usersRoutes = require("./routes/users-routes");

app.use("api/users", usersRoutes);

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
