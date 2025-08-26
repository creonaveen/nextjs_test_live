'use client';

import { parseDate, getCurrentDate } from '@/utils/date';

export function setCookie(name: string, value: string, expireDays: number = 365) {
  const d: Date = parseDate(getCurrentDate());
  d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}
export function getCookie(cname: string) {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
export class Storage {
  static setMarketId(marketId: string): void {
    try {
      setCookie('market_id', marketId);
    } catch {}
  }
  static getMarketId(): any {
    try {
      return getCookie('market_id');
    } catch {}
  }
  static setLanguage(language: string): void {
    try {
      setCookie('language', language);
    } catch {}
  }
  static getLanguage(): any {
    try {
      return getCookie('language');
    } catch {}
  }
}
