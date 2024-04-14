import { Router } from "express";

const foodRouter = Router();

foodRouter.get("/", (req, res) => {
  res.json({
    message: "Food response",
  });
});

export default foodRouter;
