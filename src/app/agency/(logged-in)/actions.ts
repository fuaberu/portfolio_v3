"use server";

import { db } from "@/lib/db";
import { ProjectSchema } from "@/lib/schemas/project";
import { stripe } from "@/lib/stripe";
import { z } from "zod";

export const createProject = async ({
	name,
	description,
	users,
	showTasks,
	tasks,
}: z.infer<typeof ProjectSchema>) => {
	const owners = users.filter((u) => u.role === "OWNER");
	if (owners.length === 0) {
		return { error: "Owner is required" };
	} else if (owners.length > 1) {
		return { error: "Only one owner is allowed" };
	}

	const res = await db.project.create({
		data: {
			name,
			description,
			showTasks,
			tasks: { create: [...tasks] },
			users: { create: users.map((u) => ({ role: u.role, userId: u.id })) },
		},
	});

	try {
		// Create customer OWNER on Stripe if they are not already
		const ownerDb = await db.user.findUniqueOrThrow({
			where: {
				id: owners[0].id,
			},
			select: {
				id: true,
				name: true,
				email: true,
				customerId: true,
			},
		});

		let customerId = ownerDb.customerId;

		if (!customerId) {
			// create customer on Stripe
			const stripeCustomer = await stripe.customers.create({
				email: ownerDb.email,
				name: ownerDb.name,
			});

			customerId = stripeCustomer.id;

			// update user
			await db.user.update({
				where: {
					id: ownerDb.id,
				},
				data: {
					customerId: stripeCustomer.id,
				},
			});
		}
	} catch (error) {
		console.log(error);
	}

	if (res) {
		return {
			success: true,
		};
	} else {
		return {
			error: "Something went wrong. Please try again later",
		};
	}
};

export const updateProject = async (data: z.infer<typeof ProjectSchema>, id: string) => {
	const { name, description, tasks } = data;
	const res = await db.project.update({
		where: { id },
		data: { name, description },
	});

	if (res) {
		return {
			success: true,
		};
	} else {
		return {
			error: "Something went wrong. Please try again later",
		};
	}
};
