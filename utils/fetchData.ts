import { Breed } from "../typings";
import { config } from "./config";

export const getAllBreed = async (): Promise<Breed> => {
  const result = await fetch(
    "https://api.thecatapi.com/v1/breeds?attach_breed=0",
    {
      headers: { "X-API-KEY": config.apiKey },
    }
  );
  const data = result.json();
  return data;
};

export const searchBreed = async (breed: string): Promise<Breed> => {
  const result = await fetch(
    `https://api.thecatapi.com/v1/breeds/search?q=${breed}`,
    {
      headers: {
        "X-API-KEY": config.apiKey,
      },
    }
  );
  const data = await result.json();
  return data;
};
