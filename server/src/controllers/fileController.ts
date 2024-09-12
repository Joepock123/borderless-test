import { Request, Response, NextFunction } from "express";
import {
  getFileUrlS3,
  selectAllFilesS3,
  uploadFileToS3,
} from "../services/s3Service";

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await uploadFileToS3(req.file);

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

    const file = await getFileUrlS3(req.params.id);

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
    const files = await selectAllFilesS3();
    res
      .status(200)
      .json({ message: "File selected successfully", file: files });
  } catch (error) {
    next(error);
  }
};
