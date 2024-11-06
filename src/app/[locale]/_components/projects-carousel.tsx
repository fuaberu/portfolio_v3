"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type ProjectsCarouselProps = {
	images: string[];
	active: boolean;
	className?: string;
};

export const ProjectsCarousel = ({ images, active, className }: ProjectsCarouselProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	return (
		<motion.div
			className={cn(
				"relative aspect-video w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800",
				className,
			)}
			animate={{
				scale: active ? 1 : 0.8,
				opacity: active ? 1 : 0.3,
			}}
			transition={{ duration: 0.2 }}
			onClick={handleNext}
		>
			<div className="relative h-full w-full">
				<Image
					src={images[currentIndex]}
					alt="Project preview"
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					priority
				/>
			</div>
		</motion.div>
	);
};
