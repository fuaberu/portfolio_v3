"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { cn } from "@/utils/cn";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const projectsData = [
	{
		title: "Fabel",
		description:
			"a personalized task management app designed to enhance your organizational efficiency. With the power of the Kanban methodology, it effortlessly breaks down substantial projects into manageable tasks while providing tracking capabilities. The integration of an intuitive calendar further aids in visualizing tasks and maintaining a comprehensive record of your progress.",
		stack: ["React.js", "Next.js", "TailwindCSS", "Typescript"],
		images: ["/fabel_landing.png"],
		links: { gitHub: "https://github.com/fuaberu/Fabel", demo: "https://fabel-ruby.vercel.app/" },
	},
	{
		title: "Fabel",
		description:
			"A personal task management app. Design to help you stay organized. It uses the Kanban metodology to separate big projects in small tasks, and keep track of them. with the help of a calendar to easly vizualize the tasks and to keep track of them.",
		stack: ["React.js", "Next.js", "TailwindCSS", "Typescript"],
		images: ["/fabel_landing.png"],
		links: { demo: "https://fabel-ruby.vercel.app/" },
	},
];

export const Projects = () => {
	const [activeProject, setActiveProject] = useState(0);
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		// uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
		target: ref,
		// container: ref,
		offset: ["start center", "end start"],
	});

	const cardLength = projectsData.length;

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		const cardsBreakpoints = projectsData.map((_, index) => index / cardLength);
		const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
			const distance = Math.abs(latest - breakpoint);
			if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
				return index;
			}
			return acc;
		}, 0);

		setActiveProject(closestBreakpointIndex);
	});

	const linearGradients = [
		"linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
		"linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
		"linear-gradient(to bottom right, var(--red-500), var(--orange-500))",
		"linear-gradient(to bottom right, var(--teal-500), var(--fuchsia-500))",
		"linear-gradient(to bottom right, var(--violet-500), var(--pink-500))",
	];
	return (
		<section className="min-h-screen space-y-10 py-6 2xl:mx-36">
			<SectionTitle title="Projects" />
			<motion.div
				className="relative flex flex-col rounded-md bg-slate-200 px-10 dark:bg-slate-900"
				ref={ref}
			>
				{projectsData.map((item, index) => (
					<div
						key={item.title + index}
						className="flex min-h-96 flex-col items-center justify-between gap-4 py-10 lg:flex-row lg:items-start"
					>
						<div className="space-y-4">
							<motion.h3
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: activeProject === index ? 1 : 0.2,
								}}
								transition={{ duration: 0.1 }}
								className="text-2xl font-bold"
							>
								{item.title}
							</motion.h3>
							<motion.p
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: activeProject === index ? 1 : 0.2,
								}}
								transition={{ duration: 0.2 }}
								className="text-kg text-slate-700 dark:text-slate-300 lg:max-w-md"
							>
								{item.description}
							</motion.p>
							<div className="flex flex-wrap gap-1">
								{item.stack.map((s, i) => (
									<motion.span
										key={s}
										initial={{
											opacity: 0,
										}}
										animate={{
											opacity: activeProject === index ? 1 : 0.2,
											color: activeProject === index ? "var(--teal-300)" : "var(--gray-300)",
										}}
										transition={{ duration: 0.2, delay: i * 0.05 }}
										className="block rounded-3xl bg-gray-600 bg-opacity-70 px-3 py-1 text-xs font-semibold dark:bg-black"
									>
										{s}
									</motion.span>
								))}
							</div>
							<motion.div
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: activeProject === index ? 1 : 0.2,
								}}
								transition={{ duration: 0.2, delay: 0.1 }}
								className="hidden flex-wrap gap-2 md:flex"
							>
								{item.links.demo && (
									<Link href={item.links.demo} target="_blank" className="p-1">
										<ExternalLink />
									</Link>
								)}
								{item.links.gitHub && (
									<Link href={item.links.gitHub} target="_blank" className="p-1">
										<Github />
									</Link>
								)}
							</motion.div>
						</div>
						<motion.div
							animate={{
								background:
									activeProject === index
										? linearGradients[index]
										: "linear-gradient(to bottom right, var(--gray-500), var(--gray-800))",
								height: activeProject === index ? "300px" : "250px",
								width: activeProject === index ? "534px" : "445px",
								opacity: activeProject === index ? 1 : 0.2,
								filter: activeProject === index ? "none" : "grayscale(1)",
							}}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className={cn("rounded-md bg-white shadow")}
						>
							<div className="relative h-full w-full">
								<div className="absolute inset-1 overflow-hidden rounded-md bg-black">
									<Image
										src={item.images[0]}
										alt={item.title}
										width={534}
										height={300}
										className="min-w-0"
									/>
								</div>
							</div>
						</motion.div>
					</div>
				))}
			</motion.div>
		</section>
	);
};

const Project = ({}: {
	title: string;
	description: string;
	stack: string[];
	links: { gitHub: string; demo: string };
}) => {
	return (
		<motion.div className="w-full rounded-xl bg-teal-300 p-6">
			<div></div>
		</motion.div>
	);
};
