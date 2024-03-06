"use server";

import { db } from "@/lib/db";
import { resend } from "@/lib/resend";
import { cookies } from "next/headers";
import { ConfirmationEmail } from "@/emails/ConfirmationEmail";
import { NotificationMeEmail } from "@/emails/NotificationMeEmail";

interface RegisterActionProps {
	action:
		| "first-visit"
		| "download-resume"
		| "open-demo"
		| "open-github"
		| "close-window"
		| "page-load";
	description?: string;
}
export const registerAction = async ({ action, description }: RegisterActionProps) => {
	if (process.env.NODE_ENV !== "production") {
		return console.log({ action, description });
	}

	const visit = cookies().get("visit");

	if (!visit) {
		return;
	}

	await db.action.create({
		data: {
			visitId: visit.value,
			action,
			description,
		},
	});
};

interface SendMessageProps {
	name: string;
	email: string;
	message: string;
}
export const sendMessage = async ({ email, message, name }: SendMessageProps) => {
	const visit = cookies().get("visit");

	if (process.env.NODE_ENV !== "production") {
		return { success: true };
	}

	try {
		if (visit) {
			await db.action.create({
				data: {
					visitId: visit.value,
					action: "send-message",
				},
			});
		}

		// Saves message in db
		await db.message.create({
			data: {
				visitId: visit?.value,
				email,
				message,
				name,
			},
		});

		// Send confirmation email
		await resend.emails.send({
			from: process.env.EMAIL!,
			to: email,
			subject: "Message confirmation",
			react: ConfirmationEmail({ name }),
		});

		// Notify me
		await resend.emails.send({
			from: process.env.EMAIL!,
			to: process.env.PRIVATE_EMAIL!,
			subject: "Message confirmation",
			react: NotificationMeEmail({ name, email, message }),
		});

		return {
			success: true,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
		};
	}
};

export const verifyPassword = async (password: string) => {
	if (password !== process.env.STATS_PASSWORD_COOKIE) {
		return {
			success: false,
		};
	}

	cookies().set({
		name: process.env.STATS_PASSWORD_COOKIE_NAME!,
		value: process.env.STATS_PASSWORD_COOKIE_VALUE!,
		maxAge: 60 * 60,
		path: "/",
		secure: true,
		httpOnly: true,
		sameSite: "strict",
	});

	return {
		success: true,
	};
};
