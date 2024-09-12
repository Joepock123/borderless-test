import { Request, Response, NextFunction } from "express";
import { uploadFileToOpenAI } from "../services/fileService";

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
