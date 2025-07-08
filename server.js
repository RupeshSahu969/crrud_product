const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRouter");
const itemRoutes = require("./routes/userRoute");

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", itemRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
