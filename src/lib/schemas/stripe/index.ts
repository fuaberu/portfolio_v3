import { z } from "zod";

export const CreateInvoiceSchema = z.object({
	customerId: z.string().min(1),
});
