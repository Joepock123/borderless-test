import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "We are getting files" });
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "We are uploading a file" });
});

export default router;
