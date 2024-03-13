"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/lib/schemas/auth";
import { createSession } from "@/lib/auth";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { email, password, name } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await db.user.findUnique({ where: { email } });

	if (existingUser) {
		return { error: "Email already in use" };
	}

	try {
		const user = await db.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});

		await createSession({ user });

		return { success: "Account created!", login: true };
	} catch (error) {
		return { error: "Internal error" };
	}
};
