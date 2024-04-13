import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Hello cái lồn",
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
