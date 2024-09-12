import { FileObject } from "openai/resources";
import { createReadStream } from "fs";

import { openai } from "../config/openai";

export const uploadFileToOpenAI = async (
  filePath: string
): Promise<FileObject> => {
  try {
    const response = await openai.files.create({
      file: createReadStream(filePath),
      purpose: "vision",
    });
    return response;
  } catch (error) {
    console.error("Error uploading file to OpenAI:", error);
    throw new Error("File upload failed");
  }
};

export const selectFileById = async (id: string): Promise<FileObject> => {
  try {
    const response = await openai.files.retrieve(id);
    return response;
  } catch (error) {
    console.error(`Error selecting file ID: ${id}`, error);
    throw new Error("Error selecting file ID: ${id}");
  }
};

export const selectAllFiles = async (): Promise<FileObject[]> => {
  try {
    const files = await openai.files.list();

    return files.data;
  } catch (error) {
    console.error(`Error selecting files`, error);
    throw new Error("Error selecting files");
  }
};
