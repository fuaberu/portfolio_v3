"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { cn } from "@/utils/cn";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { registerAction } from "../../actions";
import { ProjectsCarousel } from "./projects-carousel";

interface Props {
	translations: {
		title: string;
		fabel: {
			description: string;
		};
		water_tracker: {
			description: string;
		};
	};
}

export const Projects = ({ translations }: Props) => {
	const [activeProject, setActiveProject] = useState(0);
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		// uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
		target: ref,
		// container: ref,
		offset: ["start start", "end center"],
	});

	const projectsData = [
		{
			title: "Fabel",
			description: translations.fabel.description,
			stack: ["React.js", "Next.js", "TailwindCSS", "Typescript", "PostgreSQL"],
			images: ["/fabel_landing.png", "/fabel_kanban.png", "/fabel_calendar.png"],
			links: { gitHub: "https://github.com/fuaberu/Fabel", demo: "https://fabel-ruby.vercel.app/" },
		},
		{
			title: "Water Tracker",
			description: translations.water_tracker.description,
			stack: ["React.js", "Firebase", "TailwindCSS", "Typescript"],
			images: ["/water_reminder_home.png"],
			links: {
				gitHub: "https://github.com/fuaberu/water-daily-intake",
				demo: "https://water-reminder-web.web.app/",
			},
		},
	];

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

	return (
		<section className="relative min-h-screen space-y-10 py-6 2xl:mx-36">
			<SectionTitle title={translations.title} />
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
						className={cn(
							"flex min-h-96 flex-col items-center justify-between gap-4 py-10 lg:flex-row lg:items-start",
							{
								"pt-20": index === projectsData.length - 1,
								"pb-20": index === 0,
							},
						)}
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
						<ProjectsCarousel
							active={activeProject === index}
							images={item.images}
							className={cn(
								"origin-center bg-white shadow",
								index === projectsData.length - 1
									? "lg:origin-bottom-right"
									: "lg:origin-top-right",
							)}
						/>
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
