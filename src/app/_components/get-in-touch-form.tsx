"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/cn";
import { Linkedin, Mail } from "lucide-react";
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
import { BottomGradient } from "../../components/bottom-gradient";

const formSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().email(),
	message: z.string().min(5).max(500),
});

export const GetInTouchForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		const id = toast.loading("loading...");

		try {
			const data = await sendMessage(values);

			if (data.success) {
				toast.success("Message sent, I will get back to you as soon as I can", { id });

				form.reset();
			} else {
				toast.dismiss(id);
			}
		} catch (error) {
			toast.error("Something went wrong. Please try again later", { id });
		}
	}

	return (
		<div className="mx-auto w-full max-w-md rounded-2xl bg-white p-4 shadow-input dark:bg-black md:p-8">
			<h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Get in touch</h2>
			<p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
				Send me a message and I will get back to you as soon as I can.
			</p>

			<Form {...form}>
				<form className="mt-8" onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<LabelInputContainer className="mb-4">
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Jhon Doe" autoComplete="name" />
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
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} placeholder="jhondoem@fc.com" autoComplete="email" />
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
									<FormLabel>Your message</FormLabel>
									<FormControl>
										<Textarea {...field} placeholder="Hi there! 👋" rows={4} />
									</FormControl>
									<FormMessage />
								</LabelInputContainer>
							</FormItem>
						)}
					/>

					<button
						className="group/btn relative block h-10 w-full rounded-md border bg-gradient-to-br from-gray-50 to-gray-100 font-medium text-teal-300 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:border-none dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
						type="submit"
					>
						Send message &rarr;
						<BottomGradient />
					</button>

					<div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

					<div className="flex flex-col space-y-4">
						<a
							className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
							href="mailto:kevinfabe@gmail.com"
						>
							<Mail className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
							<span className="text-sm text-neutral-700 dark:text-neutral-300">Mail</span>
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
		</div>
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
