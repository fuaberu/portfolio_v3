import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

export const HoverEffect = ({ items, className }: { items: ReactNode[]; className?: string }) => {
	let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div className={cn("grid grid-cols-2", className)}>
			{items.map((Item, idx) => (
				<motion.div
					key={`card-${idx}`}
					className="group relative block h-full w-full p-2"
					onMouseEnter={() => setHoveredIndex(idx)}
					onMouseLeave={() => setHoveredIndex(null)}
					initial={{ opacity: 0 }}
					transition={{ duration: 1, delay: 0.4 + idx * 0.05 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
				>
					<AnimatePresence>
						{hoveredIndex === idx && (
							<motion.span
								className="absolute inset-0 -z-[5] block h-full w-full rounded-3xl bg-slate-100/60 shadow-sm dark:bg-slate-800/[0.8]"
								layoutId="hoverBackground"
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: { duration: 0.15 },
								}}
								exit={{
									opacity: 0,
									transition: { duration: 0.15, delay: 0.2 },
								}}
							/>
						)}
					</AnimatePresence>
					{Item}
				</motion.div>
			))}
		</div>
	);
};
