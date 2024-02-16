const express = require("express");
const app = express();
const taskRouter = require("./routes/taskRouter");
const connectDB = require("./Db/connect");
const notFound = require("./middlewares/not-found");
require("dotenv").config();
const errorHandlerMiddleware = require("./middlewares/errorHandler");

const port = process.env.PORT || 2222;

app.use(express.json());
app.use("/api/v1/task", taskRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Connected to DB.. and Server is listening on Port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
