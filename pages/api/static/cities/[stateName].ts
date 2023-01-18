// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cities from '@/utils/static/cities-co.json';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {


  /**
   * More info: https://simplemaps.com/data/co-cities
   */
  res.json(cities.filter(city => city.admin_name === req.query.stateName).map(i => i.city).sort());
}
