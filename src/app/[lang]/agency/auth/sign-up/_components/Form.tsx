"use client";

import z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/lib/schemas/auth";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { register } from "../actions";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

const FormComponent = () => {
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
	});

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		startTransition(() => {
			const id = toast.loading("loading...");

			register(values)
				.then((data) => {
					if (data.success) {
						toast.success(data.success, { id });

						if (!data.login) {
							router.push("/agency/auth/sign-in");
						}

						form.reset();
					} else if (data.error) {
						toast.error(data.error, { id });
					} else {
						toast.dismiss(id);
					}
				})
				.catch((error) => {
					toast.error("Something went wrong. Please try again later", { id });
				});
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="space-y-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										placeholder="John Doe"
										autoComplete="name"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										placeholder="john.doe@example.com"
										type="email"
										autoComplete="username"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										placeholder="******"
										type="password"
										autoComplete="new-password"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button disabled={isPending} type="submit" className="w-full">
					{isPending ? (
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

export default FormComponent;
