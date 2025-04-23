import express from "express";
import cors from "cors";
import { connectDB } from "./db/ConnectDB.js";
import { TodoRouter } from "./routes/todoRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/", TodoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
