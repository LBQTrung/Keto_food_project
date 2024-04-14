import express from "express";
import foodRouter from "./routes/foods.routes.js";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Hello cái lồn",
  });
});

app.use("/food", foodRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
