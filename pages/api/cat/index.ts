// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Cat } from "../../../typings";
import { config } from "../../../utils/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await fetch(
      "https://api.thecatapi.com/v1/breeds?attach_breed=0",
      {
        headers: { "X-API-KEY": config.apiKey },
      }
    );
    const data: Cat = await result.json();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(`Unexpected Error: ${error}`);
  }
}
