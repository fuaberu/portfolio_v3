"use client";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { ProjectSchema } from "@/lib/schemas/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createProject } from "../../actions";
import Spinner from "@/components/Spinner";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import { User } from "@prisma/client";

interface Props {
	users: Pick<User, "id" | "name">[];
}

export const ProjectUpsertForm = ({ users }: Props) => {
	const form = useForm<z.infer<typeof ProjectSchema>>({
		resolver: zodResolver(ProjectSchema),
		defaultValues: {
			name: "",
			description: "",
			showTasks: true,
			users: [],
			tasks: [],
			currency: "jpy",
			price: 0,
		},
	});

	const router = useRouter();

	const isLoading = form.formState.isLoading;

	const onSubmit = async (values: z.infer<typeof ProjectSchema>) => {
		const id = toast.loading("loading...");

		try {
			const data = await createProject(values);

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
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isLoading}
											placeholder="john.doe@example.com"
											type="name"
											autoComplete="off"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea rows={4} {...field} disabled={isLoading} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="showTasks"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<FormLabel className="text-base">Show tasks</FormLabel>
									</div>
									<FormControl>
										<Switch checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
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
