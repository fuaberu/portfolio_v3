import { addMinutes, addMonths } from "date-fns";
import { errors, jwtVerify } from "jose";
import { NextRequest, NextResponse, userAgent } from "next/server";
import { I18middleware } from "./lib/I18n";

export async function middleware(request: NextRequest) {
	let response = NextResponse.next();

	if (request.nextUrl.pathname.startsWith("/agency")) {
		// This logic is only applied to /agency

		// Auth
		const session = request.cookies.get("session");
		const refresh = request.cookies.get("refresh");

		if (!refresh) {
			return response;
		}

		let updateSession = false;

		try {
			if (session) {
				await jwtVerify(session.value, new TextEncoder().encode(process.env.JWT_TOKEN_SECRET));
			} else {
				updateSession = true;
			}
		} catch (err) {
			if (err instanceof errors.JWTExpired) {
				updateSession = true;
			}
		}

		if (updateSession && refresh.value) {
			response = NextResponse.redirect(request.nextUrl);
			// Try to refresh token
			const newToken = await fetch(
				process.env.NEXT_PUBLIC_SITE_URL + "/api/auth/refresh?token=" + refresh.value,
				{
					method: "GET",
				},
			);

			if (newToken.status === 200) {
				const session = await newToken.text();

				if (session) {
					response.cookies.set("session", session, {
						httpOnly: true,
						secure: true,
						sameSite: true,
						path: "/",
						expires: addMinutes(new Date(), 15),
						priority: "high",
					});
				}
			}
		}
	}

	if (request.method === "GET") {
		response = I18middleware(request);

		const hasVisit = request.cookies.get("visit");

		if (!hasVisit) {
			const { geo, ip, referrer } = request;
			const { device, browser, isBot, os } = userAgent(request);

			try {
				const visitToken = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "/api/visits", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						geo,
						ip,
						referrer,
						device,
						browser,
						isBot,
						os,
					}),
				});

				if (visitToken.status === 201) {
					const visit = await visitToken.text();

					response.cookies.set("visit", visit, {
						httpOnly: true,
						secure: true,
						sameSite: true,
						path: "/",
						maxAge: addMonths(new Date(), 13).getTime(),
						priority: "high",
					});
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			response.cookies.set("visit", hasVisit.value, {
				httpOnly: true,
				secure: true,
				sameSite: true,
				path: "/",
				maxAge: addMonths(new Date(), 13).getTime(),
				priority: "high",
			});
		}
	}

	return response;
}

export const config = {
	matcher: ["/", "/en/:path*", "/pt/:path*", "/jp/:path*", "/agency/:path*"],
};
