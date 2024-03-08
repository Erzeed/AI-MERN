import Configuration  from "openai";
import "dotenv/config";

export const configureOpenAI = () => {
  const config = new Configuration({
    apiKey: process.env.KEYGPT,
    organization: process.env.ORGANIZATION_ID,
  });
  return config;
};