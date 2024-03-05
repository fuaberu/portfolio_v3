"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useVelocity, useSpring } from "framer-motion";
import { cn } from "@/utils/cn";

export const TracingBeam = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll();

	const [svgHeight, setSvgHeight] = useState(0);

	useEffect(() => {
		if (!ref.current) return;

		const resizeObserver = new ResizeObserver(() => {
			setSvgHeight(ref.current?.offsetHeight || 0);
		});

		resizeObserver.observe(ref.current);

		return () => resizeObserver.disconnect(); // clean up
	}, []);

	const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
		stiffness: 500,
		damping: 90,
	});
	const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 100]), {
		stiffness: 500,
		damping: 90,
	});

	return (
		<motion.div
			ref={ref}
			className={cn("relative mx-auto h-full w-full max-w-screen-xl", className)}
		>
			<div className="absolute -left-7 bottom-0 top-0 md:-left-4">
				<svg
					viewBox={`0 0 20 ${svgHeight}`}
					width="20"
					height={svgHeight} // Set the SVG height
					className=" ml-4 block"
					aria-hidden="true"
				>
					<motion.path
						d={`M 1 0V -36 l 18 24 V ${svgHeight} l -18 24V ${svgHeight}`}
						fill="none"
						stroke="url(#gradient)"
						strokeWidth="1.25"
						className="motion-reduce:hidden"
						transition={{
							duration: 10,
						}}
					></motion.path>
					<defs>
						<motion.linearGradient
							id="gradient"
							gradientUnits="userSpaceOnUse"
							x1="0"
							x2="0"
							// y1={y1} // set y1 for gradient
							// y2={y2} // set y2 for gradient
							y1={y1}
							y2={y2}
						>
							<stop stopColor="#18CCFC" stopOpacity="0"></stop>
							<stop stopColor="#18CCFC"></stop>
							<stop offset="0.325" stopColor="#6344F5"></stop>
							<stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
						</motion.linearGradient>
					</defs>
				</svg>
			</div>
			<div className="pb-6">{children}</div>
		</motion.div>
	);
};
