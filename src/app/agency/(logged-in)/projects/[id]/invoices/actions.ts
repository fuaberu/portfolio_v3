"use server";

import { stripe } from "@/lib/stripe";

export const createInvoice = async ({ customerId }: { customerId: string }) => {
	try {
		const res = await stripe.invoices.create({ customer: customerId });
		console.log(res);
		return {
			success: res.id,
			error: null,
		};
	} catch (error) {
		console.error(error);
		return {
			success: null,
			error: "Something went wrong. Please try again later.",
		};
	}
};
