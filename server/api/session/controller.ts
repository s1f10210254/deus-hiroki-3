import { COOKIE_NAME } from '$/service/constants';
import type { CookieSerializeOptions } from '@fastify/cookie';
import type { Methods } from '.';
import { defineController } from './$relay';

export type AdditionalRequest = {
  body: Methods['post']['reqBody'];
};

const options: CookieSerializeOptions = {
  httpOnly: true,
  secure: true,
  path: '/',
  sameSite: 'none',
};

export default defineController(() => ({
  post: {
    hooks: {
      preHandler: (req, reply, done) => {
        const expiresIn = 60 * 60 * 24 * 5 * 1000;

        reply.setCookie(COOKIE_NAME, req.body?.jwt ?? '', {
          ...options,
          expires: new Date(Date.now() + expiresIn),
        });

        done();
      },
    },
    handler: () => {
      return { status: 200, body: { status: 'success' } };
    },
  },
  delete: {
    hooks: {
      preHandler: (_, reply, done) => {
        reply.clearCookie(COOKIE_NAME, options);
        done();
      },
    },
    handler: () => {
      return { status: 200, body: { status: 'success' } };
    },
  },
}));
