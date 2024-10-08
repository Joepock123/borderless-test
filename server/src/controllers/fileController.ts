import { Request, Response, NextFunction } from "express";
import {
  getFileUrlS3,
  selectAllFilesS3,
  uploadFileToS3,
} from "../services/s3Service";
import { extractDataFromFile } from "../services/visionService";

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

export const selectFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = await selectAllFilesS3();
    res.status(200).json(files);
  } catch (error) {
    next(error);
  }
};

export const extractTextFromFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url = await getFileUrlS3(req.params.key);

    let dob = "";
    let expiryDate = "";

    try {
      const json = await extractDataFromFile(url);
      const data = JSON.parse(json as string);
      dob = data?.dob;
      expiryDate = data?.expiryDate;
    } catch (error) {
      console.log(error);
    }

    res.status(200).json({ url, dob, expiryDate });
  } catch (error) {
    next(error);
  }
};
