"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/utils/cn";
import { AppLink } from "./link";
import { ModeToggle } from "./mode-toggle";
import { Theme } from "@/types";
import { ResumeLink } from "./resume-link";

export const FloatingNav = ({
	navItems,
	className,
	theme,
	isAgency,
}: {
	navItems: {
		name: string;
		link: string;
		icon?: JSX.Element;
	}[];
	theme: Theme;
	className?: string;
	isAgency?: boolean;
}) => {
	const { scrollYProgress } = useScroll();

	const [visible, setVisible] = useState(true);

	useMotionValueEvent(scrollYProgress, "change", (current) => {
		// Check if current is not undefined and is a number
		if (typeof current === "number") {
			let direction = current! - (scrollYProgress.getPrevious() || 0);

			if (current === 1 && scrollYProgress.getPrevious() === 0) {
				setVisible(true);
			} else if (current < 0.05) {
				setVisible(true);
			} else if (current >= 1) {
				setVisible(false);
			} else if (scrollYProgress.get() < 0.05) {
				setVisible(false);
			} else {
				if (direction < 0) {
					setVisible(true);
				} else {
					setVisible(false);
				}
			}
		}
	});

	return (
		<AnimatePresence mode="wait">
			<motion.div
				initial={{
					opacity: 1,
					y: -100,
				}}
				animate={{
					y: visible ? 0 : -100,
					opacity: visible ? 1 : 0,
				}}
				transition={{
					duration: 0.2,
				}}
				className={cn(
					"fixed inset-x-2 top-2 z-40 mx-auto flex max-w-screen-2xl items-center gap-6 rounded-xl border border-transparent bg-white px-8 py-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/[0.2] dark:bg-black",
					className,
				)}
			>
				{navItems.map((navItem: any, idx: number) => (
					<AppLink
						key={`link=${idx}`}
						href={navItem.link}
						className={cn("flex items-center gap-1")}
					>
						<span className="block xs:hidden">{navItem.icon}</span>
						<span className="hidden text-sm xs:block">{navItem.name}</span>
					</AppLink>
				))}
				<div className="ml-auto flex items-center gap-3">
					<div className="hidden sm:block">
						<ModeToggle theme={theme} text={false} />
					</div>
					{!isAgency && <ResumeLink />}
				</div>
			</motion.div>
		</AnimatePresence>
	);
};
