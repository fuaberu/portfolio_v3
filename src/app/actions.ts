"use server";

import { resend } from "@/lib/resend";

interface SendMessageProps {
	name: string;
	email: string;
	message: string;
}
export const sendMessage = async ({ email, message, name }: SendMessageProps) => {
	if (process.env.NODE_ENV !== "production") {
		return { success: true };
	}

	try {
		// Send confirmation email
		// await resend.emails.send({
		// 	from: process.env.EMAIL!,
		// 	to: email,
		// 	subject: "Message confirmation",
		// 	react: ConfirmationEmail({ name }),
		// });

		// Notify me
		await resend.emails.send({
			from: process.env.EMAIL!,
			to: process.env.PRIVATE_EMAIL!,
			subject: "Message confirmation",
			text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
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
