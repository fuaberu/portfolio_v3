"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/cn";
import { ArrowBigRight, ArrowBigRightDash, Linkedin, Mail } from "lucide-react";
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
import { sendMessage } from "@/app/actions";
import { toast } from "sonner";
import { BottomGradient } from "../../../components/bottom-gradient";
import { motion } from "framer-motion";

const formSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().email(),
	message: z.string().min(5).max(500),
});

interface Props {
	translations: {
		title: string;
		h2: string;
		p: string;
		name: string;
		name_placeholder: string;
		email: string;
		email_placeholder: string;
		message: string;
		message_placeholder: string;
		submit: string;
		success: string;
		error: string;
		loading: string;
	};
}

export const GetInTouchForm = ({ translations }: Props) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		const id = toast.loading(translations.loading);

		try {
			const data = await sendMessage(values);

			if (data.success) {
				toast.success(translations.success, { id });

				form.reset();
			} else {
				toast.dismiss(id);
			}
		} catch (error) {
			toast.error(translations.error, { id });
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			className="mx-auto w-full max-w-md rounded-2xl bg-white p-4 shadow-input dark:bg-black md:p-8"
		>
			<h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
				{translations.h2}
			</h2>
			<p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
				{translations.p}
			</p>

			<Form {...form}>
				<form className="mt-8" onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<LabelInputContainer className="mb-4">
									<FormLabel>{translations.name}</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder={translations.name_placeholder}
											autoComplete="name"
										/>
									</FormControl>
									<FormMessage />
								</LabelInputContainer>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<LabelInputContainer className="mb-4">
									<FormLabel>{translations.email}</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder={translations.email_placeholder}
											autoComplete="email"
										/>
									</FormControl>
									<FormMessage />
								</LabelInputContainer>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<LabelInputContainer className="mb-8">
									<FormLabel>{translations.message}</FormLabel>
									<FormControl>
										<Textarea {...field} placeholder={translations.message_placeholder} rows={4} />
									</FormControl>
									<FormMessage />
								</LabelInputContainer>
							</FormItem>
						)}
					/>

					<button
						className="group/btn relative flex h-10 w-full items-center justify-center gap-2 rounded-md border bg-gradient-to-br from-gray-50 to-gray-100 font-medium text-teal-300 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:border-none dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
						type="submit"
					>
						{translations.submit} <ArrowBigRight />
						<BottomGradient />
					</button>

					<div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

					<div className="flex flex-col space-y-4">
						<a
							className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
							href="mailto:kevinfabe@gmail.com"
						>
							<Mail className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
							<span className="text-sm text-neutral-700 dark:text-neutral-300">
								{translations.email}
							</span>
							<BottomGradient />
						</a>
						<a
							className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
							href="https://www.linkedin.com/in/kevin-fabel/"
						>
							<Linkedin className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
							<span className="text-sm text-neutral-700 dark:text-neutral-300">LinkedIn</span>
							<BottomGradient />
						</a>
					</div>
				</form>
			</Form>
		</motion.div>
	);
};

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};
