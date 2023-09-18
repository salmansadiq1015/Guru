const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const formidable = require("express-formidable");
const dbQuote = require("./quote");

// Dotenv Config
dotenv.config();

// Middlewares
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

// APIs
app.post("/api/create", formidable(), dbQuote.createQuote);
app.get("/api/get-quote", dbQuote.getQuote);
app.get("/api/images/:id", dbQuote.guruImageController);
app.delete("/api/delete/:id", dbQuote.deleteQuote);

// Rest API
app.use("/", (req, res) => {
  res.send("<h1>Server is running</h1>");
});

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`.bgMagenta.white);
});
