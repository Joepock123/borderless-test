import { FileObject } from "openai/resources";
import { createReadStream } from "fs";

import { openai } from "../config/openai";

const prompt = `
You are an AI expert in extracting the date of birth and expiry date of passports and returning the answer in JSON format.

Provided a passport image, extract the information and present it in this schema:

{dob: string; expiryDate: string}

The output must be in valid JSON format and should not throw an error when JSON.parse(output) is used.

Correct response: {"dob": "1989/02/17","expiryDate":"2030/10/30"}
`;

export const extractDataFromFile = async (url: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url,
              },
            },
          ],
        },
      ],
    });
    console.log(response.choices[0]);
    return response.choices[0].message.content;
  } catch (error) {
    console.error(`Error selecting file ID: ${url}`, error);
    throw new Error("Error selecting file ID: ${id}");
  }
};
