import express from "express";
import path from "path";

import cors from "cors";
import dotenv from "dotenv";

// import the router from your routes file

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      '<h1 style="text-align: center; margin-top: 50px;">✈️ ShopSage API</h1>'
    );
});
// specify the api path for the server to use

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
