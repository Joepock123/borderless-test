import fs from "fs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { s3Client } from "../config/s3";
import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  PutObjectCommandOutput,
} from "@aws-sdk/client-s3";

const bucketName = process.env.AWS_S3_BUCKET_NAME!;

export const uploadFileToS3 = async (
  file: Express.Multer.File
): Promise<PutObjectCommandOutput> => {
  try {
    const fileContent = fs.readFileSync(file.path);

    const uploadParams = {
      Bucket: bucketName,
      Key: file.originalname, // Use the original file name as the key
      Body: fileContent,
    };

    const command = new PutObjectCommand(uploadParams);
    const response = await s3Client.send(command);

    fs.unlinkSync(file.path);

    return response;
  } catch (error) {
    console.error("Error uploading file to OpenAI:", error);
    throw new Error("File upload failed");
  }
};

export const getFileUrlS3 = async (id: string) => {
  const downloadParams = {
    Bucket: bucketName,
    Key: id,
  };

  const command = new GetObjectCommand(downloadParams);
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

export const selectAllFilesS3 = async () => {
  try {
    const listParams = {
      Bucket: bucketName,
    };

    const command = new ListObjectsV2Command(listParams);
    const data = await s3Client.send(command);
    return data.Contents?.map((item) => item.Key);
  } catch (error) {
    console.error(`Error selecting files`, error);
    throw new Error("Error selecting files");
  }
};

export const getS3Object = async (key: string): Promise<any> => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    const response = await s3Client.send(command);

    if (!response.Body) {
      throw new Error("File not found");
    }

    return response.Body;
  } catch (error) {
    console.error("Error getting file from S3:", error);
    throw new Error("Could not retrieve file from S3");
  }
};
