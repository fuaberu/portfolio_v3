import { addMonths } from "date-fns";
import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(request: NextRequest) {
	let response = NextResponse.next();

	if (
		process.env.NODE_ENV === "production" &&
		request.method === "GET" &&
		(request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/contact")
	) {
		const { geo, ip, referrer } = request;
		const { device, browser, isBot, os } = userAgent(request);

		const data = { geo, device, browser, isBot, os, ip, referrer };

		const visitCookie = request.cookies.get("visit");

		let visitId = visitCookie?.value;
		if (!visitId) {
			const visit = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "/api/visits", {
				method: "POST",
				body: JSON.stringify(data),
			});

			if (visit.status === 201) {
				visitId = await visit.text();

				if (visitId) {
					response.cookies.set("visit", visitId, {
						httpOnly: true,
						secure: true,
						sameSite: true,
						path: "/",
						maxAge: addMonths(new Date(), 13).getTime(),
					});
				}
			}
		} else {
			response.cookies.set("visit", visitId, {
				httpOnly: true,
				secure: true,
				sameSite: true,
				path: "/",
				maxAge: addMonths(new Date(), 13).getTime(),
			});
		}
	}

	return response;
}

export const config = {
	matcher: {
		source: "/((?!api|_next/static|_next/image|favicon.ico|logo.png|resume.pdf|logo.svg).*)",
		missing: [
			{ type: "header", key: "next-router-prefetch" },
			{ type: "header", key: "purpose", value: "prefetch" },
		],
	},
};
