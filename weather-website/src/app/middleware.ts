import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { mapToSupportedLocale, SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/hooks/context/i18n";

// Middleware now only ensures a locale cookie exists / is updated; no URL prefixing.
export function middleware(request: NextRequest) {
  // Skip static and internal assets
  if (request.nextUrl.pathname.startsWith('/_next')) return NextResponse.next();

  const url = request.nextUrl.clone();
  const res = NextResponse.next();

  // 1. Explicit query override (?lang=cs)
  const queryLocale = url.searchParams.get('lang');
  if (queryLocale && SUPPORTED_LOCALES.includes(queryLocale as any)) {
    res.cookies.set('locale', queryLocale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  // 2. Existing cookie
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as any)) {
    return res; // already set
  }

  // 3. Accept-Language detection
  const detected = mapToSupportedLocale(request.headers.get('accept-language')) || DEFAULT_LOCALE;
  res.cookies.set('locale', detected, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  return res;
}

export const config = {
  matcher: ['/((?!_next|.*\..*).*)'],
};