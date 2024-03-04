"use server";

import { db } from "@/lib/db";
import { resend } from "@/lib/resend";
import { cookies } from "next/headers";
import { ConfirmationEmail } from "@/emails/ConfirmationEmail";

interface RegisterActionProps {
	action: "download-resume";
}
export const registerAction = async ({ action }: RegisterActionProps) => {
	const visit = cookies().get("visit");

	if (!visit) {
		return null;
	}

	await db.action.create({
		data: {
			visitId: visit.value,
			action,
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
