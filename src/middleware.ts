import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(request: NextRequest) {
	const { geo, ip, referrer } = request;
	const { device, browser, isBot, os } = userAgent(request);

	let response = NextResponse.next();

	if (!request.cookies.get("visit") && process.env.NODE_ENV === "production") {
		const data = { geo, device, browser, isBot, os, ip, referrer };

		const visit = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "/api/visits", {
			method: "POST",
			body: JSON.stringify(data),
		});

		if (visit.status === 201) {
			const visitToken = await visit.text();

			if (visitToken) {
				response.cookies.set("visit", visitToken, {
					httpOnly: true,
					secure: true,
					sameSite: true,
					path: "/",
				});
			}
		}
	}

	return response;
}

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
