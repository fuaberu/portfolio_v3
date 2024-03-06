"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { verifyPassword } from "@/app/actions";
import { toast } from "sonner";
import { BottomGradient } from "@/components/bottom-gradient";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	password: z.string().min(6).max(50),
});

export const PasswordPromptDialog = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: "",
		},
	});

	async function onSubmit({ password }: z.infer<typeof formSchema>) {
		const id = toast.loading("loading...");

		try {
			const data = await verifyPassword(password);

			if (data.success) {
				toast.success("Welcome to my portfolio stats", { id });

				router.refresh();
			} else {
				toast.error("Wrong password", { id });
			}
			form.reset();
		} catch (error) {
			toast.error("Something went wrong. Please try again later", { id });
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			className="mx-auto mt-24 w-full max-w-md rounded-2xl bg-white p-4 shadow-input dark:bg-black md:p-8"
		>
			<h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
				Verify Access Password
			</h2>
			<p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
				If you want to see ask to Kevin Fabel for access.
			</p>

			<Form {...form}>
				<form className="mt-8 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="******"
										type="password"
										autoComplete="chrome-off"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<button
						className="group/btn relative block h-10 w-full rounded-md border bg-gradient-to-br from-gray-50 to-gray-100 font-medium text-teal-300 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:border-none dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
						type="submit"
					>
						Validate
						<BottomGradient />
					</button>
				</form>
			</Form>
		</motion.div>
	);
};
