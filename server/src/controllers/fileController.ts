import { Request, Response, NextFunction } from "express";
import {
  selectAllFiles,
  selectFileById,
  uploadFileToOpenAI,
} from "../services/fileService";

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const result = await uploadFileToOpenAI(filePath);

    res
      .status(200)
      .json({ message: "File uploaded successfully", data: result });
  } catch (error) {
    next(error);
  }
};

export const selectFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = await selectFileById(req.params.id);

    res.status(200).json({ message: "File selected successfully", file });
  } catch (error) {
    next(error);
  }
};

export const selectFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = await selectAllFiles();
    res
      .status(200)
      .json({ message: "File selected successfully", file: files });
  } catch (error) {
    next(error);
  }
};
