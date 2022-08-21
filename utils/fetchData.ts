import { Cat } from "../typings";
import { config } from "./config";

export const getAllBreed = async (): Promise<Cat> => {
  const result = await fetch(
    "https://api.thecatapi.com/v1/breeds?attach_breed=0",
    {
      headers: { "X-API-KEY": config.apiKey },
    }
  );
  const data = result.json();
  return data;
};
