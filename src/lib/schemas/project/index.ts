import { z } from "zod";
import { UserProjectRole } from "@prisma/client";

export const ProjectSchema = z.object({
	name: z.string().min(1),
	description: z.string(),
	showTasks: z.boolean(),
	users: z.array(
		z.object({
			id: z.string().min(1),
			role: z.nativeEnum(UserProjectRole),
		}),
	),
	tasks: z.array(
		z.object({
			name: z.string(),
			description: z.string(),
			weight: z.number().min(0).max(100),
		}),
	),
	price: z.number().min(1),
	currency: z.string().length(3),
});
