import { AppContext } from 'next/app';
import nookies from 'nookies';

import RSStorage from '@/sdk/storage/base';

export default class CookieStorage implements RSStorage {
  private readonly ctx?;

  constructor(ctx?: AppContext) {
    this.ctx = ctx;
  }

  get(key: string): string | null {
    const cookies = nookies.get(this.ctx?.ctx);
    return cookies ? cookies[key] : null;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  set(key: string, value: string, expires_in?: number): void {
    nookies.set(this.ctx?.ctx, key, value, {
      maxAge: expires_in,
      path: '/',
      httpOnly: false,
    });
  }

  delete(key: string): void {
    nookies.destroy(this.ctx?.ctx, key);
  }
}
