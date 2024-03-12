import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Role, Task, Prisma } from "@prisma/client";
import { Banknote, CheckCheck, Eye } from "lucide-react";
import Link from "next/link";
import { CreateProjectModal } from "./projects/_components/CreateProjectModal";

const page = async () => {
	const user = await auth();

	let whereProjects: Prisma.ProjectWhereInput = { users: { some: { id: user.id } } };

	if (user.role === Role.SUPERADMIN) {
		whereProjects = {};
	}

	const projects = await db.project.findMany({
		where: whereProjects,
		include: { tasks: { select: { id: true, completed: true, weight: true } } },
	});

	const users = await db.user.findMany({ where: { role: Role.USER } });

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-bold">Welcome {user.name}</h2>
				{user.role === Role.SUPERADMIN && <CreateProjectModal users={users} />}
			</div>
			<Separator />
			<h3 className="text-2xl font-semibold">My projects</h3>
			<div className="">
				{projects.map((project) => (
					<div
						key={project.id}
						className="flex items-center justify-between gap-10 rounded-md border border-neutral-100 p-4 shadow dark:border-white/[0.1]"
					>
						<div className="flex-1">
							<h4 className="text-xl font-medium">{project.name}</h4>
							<p className="">{project.description}</p>
						</div>
						<div className="flex-[3]">
							<ProjectStatus tasks={project.tasks} />
						</div>
						<div className="flex flex-1 items-center justify-end gap-2">
							{user.role === Role.SUPERADMIN && (
								<Link href={`/agency/projects/${project.id}/edit`}>
									<Eye size={32} />
								</Link>
							)}
							<Link href={`/agency/projects/${project.id}/invoices`}>
								<Banknote size={32} />
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const ProjectStatus = (project: { tasks: Pick<Task, "completed" | "weight">[] }) => {
	const totalWeight = project.tasks.reduce((acc, task) => acc + task.weight, 0);

	const totalCompleted = project.tasks.reduce(
		(acc, task) => (task.completed ? acc + task.weight : acc),
		0,
	);

	if (totalWeight === totalCompleted) {
		return (
			<p className="flex items-center gap-2 text-green-500">
				Completed <CheckCheck />
			</p>
		);
	}

	return (
		<div className="flex items-center justify-end gap-2 pl-10">
			<Progress className="w-full" value={(totalCompleted / totalWeight) * 100} />
			<span>{totalCompleted / totalWeight}%</span>
		</div>
	);
};

export default page;
