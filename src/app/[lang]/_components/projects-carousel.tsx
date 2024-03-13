"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
	images: string[];
	active?: boolean;
	className?: string;
}

export const ProjectsCarousel = ({ images, active, className }: Props) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const [loadedImages, setLoadedImages] = useState<string[]>([]);

	const [hovering, setHovering] = useState(false);

	useEffect(() => {
		const loadImages = () => {
			setLoading(true);
			const loadPromises = images.map((image) => {
				return new Promise((resolve, reject) => {
					const img = new Image();
					img.src = image;
					img.onload = () => resolve(image);
					img.onerror = reject;
				});
			});

			Promise.all(loadPromises)
				.then((loadedImages) => {
					setLoadedImages(loadedImages as string[]);
				})
				.catch((error) => console.error("Failed to load images", error))
				.finally(() => setLoading(false));
		};

		loadImages();
	}, [images]);

	useEffect(() => {
		// active
		let interval: any;
		if (active && images.length > 1 && !loading) {
			interval = setInterval(() => {
				if (!hovering) {
					setCurrentIndex((prevIndex) => (prevIndex + 1 === images.length ? 0 : prevIndex + 1));
				}
			}, 2000);
		}

		return () => clearInterval(interval);
	}, [active, hovering, images, loading]);

	const slideVariants = {
		initial: {
			scale: 0,
			opacity: 0,
			rotateX: 45,
		},
		visible: {
			scale: 1,
			rotateX: 0,
			opacity: 1,
			transition: {
				duration: 0.5,
				ease: [0.645, 0.045, 0.355, 1.0],
			},
		},
	};

	return (
		<div
			className={cn(
				"relative aspect-video w-[534px] max-w-full overflow-hidden rounded-md p-1 duration-300 ease-out",
				active
					? "bg-gradient-to-br from-cyan-500 to-emerald-500 opacity-100 grayscale-0 sm:scale-110 md:scale-100 xl:scale-110"
					: "scale-100 bg-gray-500 opacity-20 grayscale",
				className,
			)}
			style={{
				perspective: "1000px",
			}}
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
			onFocus={() => setHovering(true)}
			onBlur={() => setHovering(false)}
		>
			{!loading ? (
				loadedImages.length > 0 ? (
					<AnimatePresence>
						<motion.img
							key={currentIndex}
							src={loadedImages[currentIndex]}
							initial="initial"
							animate="visible"
							variants={slideVariants}
							className="h-full w-full rounded-md object-cover object-center"
						/>
					</AnimatePresence>
				) : (
					<div className="flex h-full w-full items-center justify-center">Erro Loading Images</div>
				)
			) : (
				<div className="flex h-full w-full items-center justify-center">Loading...</div>
			)}
		</div>
	);
};
