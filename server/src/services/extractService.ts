import {
  AnalyzeDocumentCommand,
  AnalyzeDocumentCommandInput,
} from "@aws-sdk/client-textract";
import { Readable } from "stream";

import { textract } from "../config/textract";

const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

export const extractDataFromBuffer = async (body: Readable) => {
  try {
    const documentBuffer = await streamToBuffer(body as Readable);
    const textractParams: AnalyzeDocumentCommandInput = {
      Document: {
        Bytes: documentBuffer,
      },
      FeatureTypes: ["FORMS"],
    };

    const command = new AnalyzeDocumentCommand(textractParams);
    const response = await textract.send(command);

    return response;
  } catch (error) {
    console.error(`Error selecting file ID`, error);
    throw new Error("Error selecting file ID: ${id}");
  }
};
