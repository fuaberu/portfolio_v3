import { NextRequest, NextResponse, userAgent } from "next/server";
import { addHours } from "date-fns";

export async function middleware(request: NextRequest) {
	const { geo, ip, referrer } = request;
	const { device, browser, isBot, os } = userAgent(request);

	let response = NextResponse.next();

	const visitCookie = request.cookies.get("visit");

	if (process.env.NODE_ENV === "production") {
		const data = { geo, device, browser, isBot, os, ip, referrer };

		let visitId = visitCookie?.value;
		if (!visitId) {
			const visit = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "/api/visits", {
				method: "POST",
				body: JSON.stringify(data),
			});

			if (visit.status === 201) {
				visitId = await visit.text();
			}
		}

		if (visitId) {
			response.cookies.set("visit", visitId, {
				httpOnly: true,
				secure: true,
				sameSite: true,
				path: "/",
				expires: addHours(new Date(), 1),
			});
		}
	}

	return response;
}

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
