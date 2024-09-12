import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
import { uploadFile } from "../controllers/fileController";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "We are getting files" });
});

router.post("/", upload.single("file"), uploadFile);

export default router;
