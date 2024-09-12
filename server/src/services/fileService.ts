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
