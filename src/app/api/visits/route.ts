import { db } from "@/lib/db";
import { addMonths } from "date-fns";
import { NextRequest, NextResponse, userAgent } from "next/server";

export async function GET(request: NextRequest) {
	const visitCookie = request.cookies.get("visit");

	if (visitCookie) {
		return new NextResponse(JSON.stringify({ success: true }), {
			status: 200,
		});
	}

	const { geo, ip, referrer } = request;
	const { device, browser, isBot, os } = userAgent(request);

	console.log({ geo, ip, referrer, device, browser, isBot, os });

	try {
		const newVisit = await db.visit.create({
			data: {
				...geo,
				...device,
				browserName: browser?.name,
				browserVersion: browser?.version,
				osName: os?.name,
				osVersion: os?.version,
				isBot,
				ip,
				referrer,
			},
		});

		await db.action.create({
			data: {
				visitId: newVisit.id,
				action: "first-visit",
			},
		});

		// Set json response first
		const response = NextResponse.json({ success: true }, { status: 201 });

		// Then set a cookie
		response.cookies.set("visit", newVisit.id, {
			httpOnly: true,
			secure: true,
			sameSite: true,
			path: "/",
			maxAge: addMonths(new Date(), 13).getTime(),
			priority: "high",
		});

		return response;
	} catch (error) {
		return new NextResponse(JSON.stringify(null), {
			status: 500,
		});
	}
}
