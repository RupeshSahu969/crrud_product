  const express = require("express");
  const dotenv = require("dotenv");
  const cors = require("cors");
  const connectDB = require("./config/db");
  const path = require('path');
  const productRoutes = require("./routes/productRoute");
  const feedbackRoutes = require("./routes/feddbacked");

  dotenv.config();
  connectDB();

 const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


  app.use(
    cors({
      origin: process.env.CLIENT_URL || '*', 
      credentials: true,
    })
  );
  app.use(express.json());

  // Routes
  app.use('/products', productRoutes);
  app.use('/feedback', feedbackRoutes);

  // Default route (optional)
  app.get('/', (req, res) => {
    res.send('API is running...');
  });

  // Start server
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
