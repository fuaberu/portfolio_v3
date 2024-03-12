import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { ProjectUpsertForm } from "../_forms/project-form";
import { User } from "@prisma/client";

interface Props {
	users: Pick<User, "id" | "name">[];
}

export function CreateProjectModal({ users }: Props) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost">New Project</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Create Project</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you're done.
					</SheetDescription>
				</SheetHeader>
				<ProjectUpsertForm users={users} />
			</SheetContent>
		</Sheet>
	);
}
