import { addMinutes } from "date-fns";
import { errors, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	let response = NextResponse.next();

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

	return response;
}

export const config = {
	matcher: {
		source: "/agency/:path*",
		missing: [
			{ type: "header", key: "next-router-prefetch" },
			{ type: "header", key: "purpose", value: "prefetch" },
		],
	},
};
