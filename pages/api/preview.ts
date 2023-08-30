import type { NextApiRequest, NextApiResponse } from 'next';

function notFound(res: NextApiResponse) {
  res.status(404);
  return res.send('Not found');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Validate and verify secret
  const { secret, versionId } = req.query;

  if (!secret) return notFound(res);

  const decodedSecret = decodeURIComponent(secret as string);
  if (decodedSecret !== process.env.PREVIEW_SECRET) return notFound(res);

  res.setPreviewData({});

  let { redirect } = req.query;

  if (versionId) {
    redirect = String(redirect) + `?versionId=${versionId}`;
  }

  if (redirect) {
    return res.redirect(redirect as string);
  }

  return res.redirect('/');
}
