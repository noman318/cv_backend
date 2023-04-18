const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { router } = require("./routes/userRoutes");
require("dotenv").config();
const port = process.env.port;
const app = express();

const connectionString = "mongodb://127.0.0.1:27017/assestment";
mongoose
  .connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => console.log("Connected to db successfully"))
  .catch((err) => console.log(err));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send("Testing Root route");
});
app.use("/api/v1", router);

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server running on ${port}`);
});
