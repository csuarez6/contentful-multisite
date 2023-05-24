// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cities from '@/utils/static/cities-co.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /**
   * More info: https://simplemaps.com/data/co-cities
   */
  const citiesFilter = cities.filter(city => city.admin_name === req.query.stateName).map(i => { return { city: i.city, isCovered: i.isCovered }; });
  // res.json(cities.filter(city => city.admin_name === req.query.stateName).map(i => i.city).sort());
  res.json(citiesFilter);
}
