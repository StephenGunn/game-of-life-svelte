import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  return new Response('OK', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain'
    }
  });
};