import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

export type Locale = "en" | "pt" | "jp";

export const locales: Locale[] = ["en", "pt", "jp"];

export const defaultLocale = locales[0];

function getLocale(request: NextRequest) {
	let languages = new Negotiator({
		headers: { "accept-language": request.headers.get("accept-language") || "" },
	}).languages();

	return match(languages, locales, defaultLocale);
}

export const I18middleware = (request: NextRequest) => {
	const { pathname } = request.nextUrl;

	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (pathnameHasLocale) {
		const response = NextResponse.next();

		const locale = pathname.split("/")[1];

		response.headers.set("x-locale", locale);

		return response;
	}
	const locale = getLocale(request);

	// Redirect if there is no locale
	request.nextUrl.pathname = `/${locale}${pathname}`;
	// e.g. incoming request is /products
	// The new URL is now /en-US/products

	const response = NextResponse.redirect(request.nextUrl);

	response.headers.set("x-locale", locale);

	return response;
};
