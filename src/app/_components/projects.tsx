"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { cn } from "@/utils/cn";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { registerAction } from "../actions";

const projectsData = [
	{
		title: "Fabel",
		description:
			"A personalized task management app designed to enhance your organizational efficiency. With the power of the Kanban methodology, it effortlessly breaks down substantial projects into manageable tasks while providing tracking capabilities. The integration of an intuitive calendar further aids in visualizing tasks and maintaining a comprehensive record of your progress.",
		stack: ["React.js", "Next.js", "TailwindCSS", "Typescript", "PostgreSQL"],
		images: ["/fabel_landing.png"],
		links: { gitHub: "https://github.com/fuaberu/Fabel", demo: "https://fabel-ruby.vercel.app/" },
	},
	{
		title: "Water Tracker",
		description:
			"A personal app to track your daily water awmount intake. It allows you to enter the amount of water consumed and the day it was consumed. The app also provides an interactive chart that displays your water intake over time.",
		stack: ["React.js", "Firebase", "TailwindCSS", "Typescript"],
		images: ["/water_reminder_home.png"],
		links: {
			gitHub: "https://github.com/fuaberu/water-daily-intake",
			demo: "https://water-reminder-web.web.app/",
		},
	},
];

export const Projects = () => {
	const [activeProject, setActiveProject] = useState(0);
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		// uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
		target: ref,
		// container: ref,
		offset: ["start start", "end center"],
	});

	const [windowInnerWidth, setWindowInnerWidth] = useState(0);

	useEffect(() => {
		setWindowInnerWidth(window.innerWidth);

		window.addEventListener("resize", () => setWindowInnerWidth(window.innerWidth));

		return (): void =>
			window.removeEventListener("resize", () => setWindowInnerWidth(window.innerWidth));
	}, []);

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
		<section className="relative min-h-screen space-y-10 py-6 2xl:mx-36">
			<SectionTitle title="Projects" />
			<motion.div
				className="relative flex flex-col rounded-md bg-slate-200 px-4 dark:bg-slate-900 lg:px-10"
				ref={ref}
				initial={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
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
								className="flex flex-wrap gap-2"
							>
								{item.links.demo && (
									<Link
										href={item.links.demo}
										target="_blank"
										className="p-1 hover:text-teal-400"
										aria-label={`Open ${item.title} demo`}
										onClick={() => registerAction({ action: "open-demo", description: item.title })}
									>
										<ExternalLink />
									</Link>
								)}
								{item.links.gitHub && (
									<Link
										href={item.links.gitHub}
										target="_blank"
										className="p-1 hover:text-teal-400"
										aria-label={`Open ${item.title} gitHub`}
										onClick={() =>
											registerAction({ action: "open-github", description: item.title })
										}
									>
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
								scale: activeProject === index ? (windowInnerWidth > 1250 ? 1.2 : 1) : 1,
								opacity: activeProject === index ? 1 : 0.2,
								filter: activeProject === index ? "grayscale(0)" : "grayscale(1)",
							}}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className={cn(
								"my-4 aspect-video w-full max-w-[534px] origin-center rounded-md bg-white shadow",
								index === projectsData.length - 1
									? "lg:origin-bottom-right"
									: "lg:origin-top-right",
							)}
						>
							<div className="relative h-full w-full">
								<div className="absolute inset-1 min-h-0 rounded-md bg-black">
									<Image
										src={item.images[0]}
										alt={item.title}
										fill
										sizes="(max-width: 1024px) 100%, 534px"
										className="w-full rounded-md object-cover object-center"
										priority
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
