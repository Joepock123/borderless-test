import { Router } from "express";
import multer from "multer";
import {
  extractTextFromFile,
  selectFileUrl,
  selectFiles,
  uploadFile,
} from "../controllers/fileController";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), uploadFile);
router.get("/", selectFiles);
router.put("/:key", extractTextFromFile);

export default router;
