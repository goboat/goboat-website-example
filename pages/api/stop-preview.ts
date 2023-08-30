import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData();

  if (req.query?.redirect) return res.redirect(`${req.query.redirect}`);

  return res.redirect('/');
}
