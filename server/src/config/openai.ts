import OpenAI from "openai";

export const openai = new OpenAI({
  organization: process.env.OPENAI_ORG,
  project: process.env.BORDERLESS_PROJECT_ID,
  apiKey: process.env.BORDERLESS_API_KEY,
});
