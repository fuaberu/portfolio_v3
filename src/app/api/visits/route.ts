import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const visitCookie = request.cookies.get("visit");

	if (visitCookie) {
		return new NextResponse(JSON.stringify({ success: true }), {
			status: 200,
		});
	}

	const { geo, ip, referrer, device, browser, isBot, os } = await request.json();

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

		return new NextResponse(newVisit.id, { status: 201 });
	} catch (error) {
		return new NextResponse(JSON.stringify(null), {
			status: 500,
		});
	}
}
