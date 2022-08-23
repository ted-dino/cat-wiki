// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Cat } from "../../../typings";
import { config } from "../../../utils/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Cat | Error>
) {
  const { name } = req.query;
  const result = await fetch(
    `https://api.thecatapi.com/v1/breeds/search?q=${name}`,
    {
      headers: { "X-API-KEY": config.apiKey },
    }
  );
  const data: Cat = await result.json();
  res.status(200).json(data);
}
