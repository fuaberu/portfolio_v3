"use client";

import { cn } from "@/utils/cn";
import { motion, useAnimate, useInView } from "framer-motion";
import { useEffect, useState } from "react";

interface Word {
	text: string;
	className?: string;
}

interface MultiTypewriterEffectProps extends React.HTMLAttributes<HTMLDivElement> {
	sentences: Word[][];
	cursorClassName?: string;
}

export const MultipleSentencesTypewriterEffect = ({
	sentences,
	className,
	cursorClassName,
}: MultiTypewriterEffectProps) => {
	const [index, setIndex] = useState(0);

	return (
		<TypewriterEffectSmooth
			key={`type-effect-${index}`}
			words={sentences[index]}
			className={className}
			cursorClassName={cursorClassName}
			onComplete={() => {
				setIndex((i) => (i < sentences.length - 1 ? i + 1 : 0));
			}}
		/>
	);
};

export const TypewriterEffectSmooth = ({
	words,
	className,
	cursorClassName,
	onComplete,
}: {
	words: Word[];
	className?: string;
	cursorClassName?: string;
	onComplete?: () => void;
}) => {
	const [scope, animate] = useAnimate();
	const isInView = useInView(scope);
	const [initialWidth, setInitialWidth] = useState(0);

	useEffect(() => {
		setInitialWidth((scope.current.offsetWidth / scope.current.parentElement.offsetWidth) * 100);
	}, []);

	useEffect(() => {
		const runRecursiveAnimation = () => {
			if (!isInView) {
				return scope.animations.forEach((animation) => animation.stop());
			}
			animate(
				scope.current,
				{ width: ["0%", initialWidth + "%", initialWidth + "%", "0%"] },
				{
					duration: 6,
					ease: "linear",
					delay: 1,

					onComplete: () => {
						onComplete && onComplete();
						runRecursiveAnimation();
					},
					onPlay: () => {
						animate(
							scope.current,
							{ opacity: 1 },
							{
								duration: 0.1,
							},
						);
					},
				},
			);
		};

		runRecursiveAnimation();
	}, [isInView, scope]);

	// split text inside of words into array of characters
	const wordsArray = words.map((word) => {
		return {
			...word,
			text: word.text.split(""),
		};
	});

	const renderWords = () => {
		return (
			<div>
				{wordsArray.map((word, idx) => {
					return (
						<div key={`word-${idx}`} className="contents">
							{word.text.map((char, index) => (
								<span
									key={`char-${index}`}
									className={cn(`text-black dark:text-white `, word.className)}
								>
									{char !== " " ? char : " "}
								</span>
							))}
						</div>
					);
				})}
				&nbsp;
			</div>
		);
	};

	return (
		<div className={cn("my-6 flex text-base", className)}>
			<motion.div
				ref={scope}
				className="overflow-hidden pb-2"
				initial={{
					width: "fit-content",
					opacity: 0,
				}}
			>
				<div
					className="font-bold"
					style={{
						whiteSpace: "nowrap",
					}}
				>
					{renderWords()}{" "}
				</div>{" "}
			</motion.div>
			<motion.span
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				transition={{
					duration: 0.8,

					repeat: Infinity,
					repeatType: "reverse",
				}}
				className={cn("block h-4 w-1  rounded-sm bg-blue-500", cursorClassName)}
			></motion.span>
		</div>
	);
};
