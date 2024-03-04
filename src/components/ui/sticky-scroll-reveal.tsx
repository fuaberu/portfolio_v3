"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const StickyScroll = ({
	content,
	contentClassName,
}: {
	content: {
		title: string;
		description: string;
		content?: React.ReactNode | any;
	}[];
	contentClassName?: string;
}) => {
	const [activeCard, setActiveCard] = React.useState(0);
	const ref = useRef<any>(null);
	const { scrollYProgress } = useScroll({
		// uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
		target: ref,
		// container: ref,
		offset: ["start center", "end start"],
	});
	const cardLength = content.length;

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		const cardsBreakpoints = content.map((_, index) => index / cardLength);
		const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
			const distance = Math.abs(latest - breakpoint);
			if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
				return index;
			}
			return acc;
		}, 0);

		console.log(cardsBreakpoints, closestBreakpointIndex, latest);
		setActiveCard(closestBreakpointIndex);
	});

	const backgroundColors = ["var(--slate-900)", "var(--black)", "var(--neutral-900)"];
	const linearGradients = [
		"linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
		"linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
		"linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
	];
	return (
		<motion.div
			animate={{
				backgroundColor: backgroundColors[activeCard % backgroundColors.length],
			}}
			className="relative flex justify-center space-x-10 rounded-md px-10"
			ref={ref}
		>
			<div className="div relative flex items-start px-4">
				<div className="max-w-2xl">
					{content.map((item, index) => (
						<div key={item.title + index} className="py-20">
							<motion.h2
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: activeCard === index ? 1 : 0.3,
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
									opacity: activeCard === index ? 1 : 0.3,
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
					background: linearGradients[activeCard % linearGradients.length],
				}}
				className={cn(
					"sticky top-[calc(50vh-144px)] hidden h-72 w-96 overflow-hidden rounded-md bg-white lg:block",
					contentClassName,
				)}
			>
				{content[activeCard].content ?? null}
			</motion.div>
		</motion.div>
	);
};
