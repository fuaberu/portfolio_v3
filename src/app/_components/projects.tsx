"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { cn } from "@/utils/cn";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

const projectsData = [
	{
		title: "Project Title",
		description: "Description",
		stack: ["Stack"],
		links: { gitHub: "", demo: "Links" },
	},
	{
		title: "Project 51611651",
		description: "Description",
		stack: ["Stack"],
		links: { gitHub: "", demo: "Links" },
	},
	{
		title: "Project d56sa1d1as6d16a",
		description: "Description",
		stack: ["Stack"],
		links: { gitHub: "", demo: "Links" },
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

	const backgroundColors = ["var(--slate-900)", "var(--black)", "var(--neutral-900)"];
	const linearGradients = [
		"linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
		"linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
		"linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
	];
	return (
		<section className="min-h-screen space-y-10 py-6 md:mx-12">
			<SectionTitle title="Projects" />
			<motion.div
				animate={{
					backgroundColor: backgroundColors[activeProject % backgroundColors.length],
				}}
				className="relative flex justify-center space-x-10 rounded-md px-10"
				ref={ref}
			>
				<div className="div flex flex-1 items-start px-4">
					<div className="max-w-2xl">
						{projectsData.map((item, index) => (
							<div key={item.title + index} className="min-h-96 py-20">
								<motion.h2
									initial={{
										opacity: 0,
									}}
									animate={{
										opacity: activeProject === index ? 1 : 0.3,
									}}
									className="text-2xl font-bold text-slate-100"
								>
									{item.title}
								</motion.h2>
								<motion.p
									initial={{
										opacity: 0,
									}}
									animate={{
										opacity: activeProject === index ? 1 : 0.3,
									}}
									className="text-kg mt-10 max-w-sm text-slate-300"
								>
									{item.description}
								</motion.p>
							</div>
						))}
					</div>
				</div>
				<motion.div
					animate={{
						background: linearGradients[activeProject % linearGradients.length],
					}}
					className={cn(
						"sticky top-[calc(50vh-144px)] my-10 hidden h-72 w-96 overflow-hidden rounded-md bg-white lg:block",
					)}
				>
					{projectsData[activeProject].title ?? null}
				</motion.div>
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
			<div>
				<h3 className="text-2xl font-semibold">Project Title</h3>
				<p>Description</p>
				<div>Stack</div>
				<div>Links</div>
			</div>
		</motion.div>
	);
};
