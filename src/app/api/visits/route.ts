import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const VisitSchema = z.object({
	geo: z
		.object({
			city: z.string().optional(),
			country: z.string().optional(),
			region: z.string().optional(),
			latitude: z.string().optional(),
			longitude: z.string().optional(),
		})

		.optional(),
	device: z
		.object({
			model: z.string().optional(),
			type: z.string().optional(),
			vendor: z.string().optional(),
		})

		.optional(),
	browser: z.object({ name: z.string().optional(), version: z.string().optional() }),
	isBot: z.boolean(),
	os: z.object({ name: z.string().optional(), version: z.string().optional() }),
	ip: z.string().optional(),
	referrer: z.string().optional(),
});

export async function POST(request: NextRequest) {
	const body = await request.json();

	console.log(body);

	const validatedFields = VisitSchema.safeParse(body);

	if (!validatedFields.success) {
		console.log(validatedFields.error);
		return new NextResponse(JSON.stringify(null), {
			status: 400,
		});
	}

	const { geo, device, browser, isBot, os, ip, referrer } = validatedFields.data;

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

		return new NextResponse(newVisit.id, {
			status: 201,
		});
	} catch (error) {
		return new NextResponse(JSON.stringify(null), {
			status: 500,
		});
	}
}
