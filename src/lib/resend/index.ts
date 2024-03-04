import { Resend } from "resend";

declare global {
	var resend: Resend | undefined;
}

export const resend = globalThis.resend || new Resend(process.env.RESEND_API_KEY);

if (process.env.NODE_ENV !== "production") globalThis.resend = resend;