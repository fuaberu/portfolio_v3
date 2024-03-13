"use server";

import z from "zod";
import { db } from "@/lib/db";
import { LoginSchema } from "@/lib/schemas/auth";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";
import { cookies } from "next/headers";
import { Prisma, Role } from "@prisma/client";
import { stripe } from "@/lib/stripe";

export const login = async (values: z.infer<typeof LoginSchema>) => {
	if (!process.env.JWT_TOKEN_SECRET || !process.env.JWT_REFRESH_TOKEN_SECRET) {
		throw new Error("Missing environment auth secret");
	}

	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { email, password } = validatedFields.data;

	try {
		const user = await db.user.findUnique({
			where: { email },
			select: {
				id: true,
				email: true,
				name: true,
				password: true,
				active: true,
				customerId: true,
				role: true,
			},
		});

		if (!user || !user.email || !user.password) {
			return { error: "Invalid Email or Password" };
		}

		if (!user.active) {
			return { error: "Your account is not active" };
		}

		const valid = await bcrypt.compare(password, user.password);

		if (!valid) {
			return { error: "Invalid Email or Password" };
		}

		let toUpdate: Prisma.UserUpdateInput = {};

		// add visit to user
		if (cookies().get("visit")?.value) {
			toUpdate.visits = {
				connect: { id: cookies().get("visit")?.value },
			};
		}

		// Stripe
		if (!user.customerId && user.role === Role.USER) {
			// create in stripe
			const stripeCustomer = await stripe.customers.create({ name: user.name, email: user.email });

			toUpdate.customerId = stripeCustomer.id;
		}

		// If needs to update
		if (toUpdate) {
			await db.user.update({
				where: { id: user.id },
				data: toUpdate,
			});
		}

		await createSession({ user });

		return { success: "Logged in!" };
	} catch (error) {
		console.error(error);
		return { error: "Something went wrong. Please try again later" };
	}
};
