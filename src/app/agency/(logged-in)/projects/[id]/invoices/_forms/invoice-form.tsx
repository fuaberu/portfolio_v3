"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { CreateInvoiceSchema } from "@/lib/schemas/stripe";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { createInvoice } from "../actions";

interface Props {
	customerId: string;
}

export const InvoiceUpsertForm = ({ customerId }: Props) => {
	const form = useForm<z.infer<typeof CreateInvoiceSchema>>({
		resolver: zodResolver(CreateInvoiceSchema),
		defaultValues: {
			customerId,
		},
	});

	const router = useRouter();

	const isLoading = form.formState.isLoading;

	const onSubmit = async (values: z.infer<typeof CreateInvoiceSchema>) => {
		const id = toast.loading("loading...");

		try {
			const data = await createInvoice(values);

			if (data.success) {
				router.refresh();

				toast.success(data.success, { id });

				form.reset();
			} else if (data.error) {
				toast.error(data.error, { id });
			} else {
				toast.dismiss(id);
			}
		} catch (error) {
			toast.error("Something went wrong. Please try again later", { id });
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="space-y-4">
					<>
						<FormField
							control={form.control}
							name="customerId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>CustomerId</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isLoading}
											placeholder="john.doe@example.com"
											type="customerId"
											autoComplete="off"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				</div>
				<Button disabled={isLoading} type="submit" className="w-full">
					{isLoading ? (
						<div className="flex items-center gap-2">
							<Spinner type="secondary" size="sm" /> Loading
						</div>
					) : (
						"Continue"
					)}
				</Button>
			</form>
		</Form>
	);
};
