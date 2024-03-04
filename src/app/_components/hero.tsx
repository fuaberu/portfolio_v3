import { BottomGradient } from "@/components/bottom-gradient";
import { MultipleSentencesTypewriterEffect } from "@/components/ui/typewriter-effect";
import Link from "next/link";

const sentencePortuguese = [
	{
		text: "Vamos construir incriveis apps ",
	},
	{
		text: "juntos.",
		className: "text-blue-500 dark:text-blue-500",
	},
];

const setenceEnglish = [
	{
		text: "Let's build awesome apps ",
	},
	{
		text: "together.",
		className: "text-blue-500 dark:text-blue-500",
	},
];

const setenceJapanese = [
	{
		text: "一緒に",
		className: "text-blue-500 dark:text-blue-500",
	},
	{
		text: "最高のアプリを作りませんか？",
	},
];
const sentences = [setenceJapanese, setenceEnglish, sentencePortuguese];

export const Hero = () => {
	return (
		<section className="relative min-h-screen animate-move-up pt-[25vh]">
			<div className="space-y-8 px-0 md:space-y-12 lg:space-y-16 lg:px-12 xl:px-28">
				<div className="font-bold">
					<span className="text-3xl text-gray-700 dark:text-gray-400 lg:text-5xl">
						Hello, nice to meet you 👋
					</span>
					<h1 className="text-5xl lg:text-8xl">{"I'm Kevin Fabel"}</h1>
					<p className="text-xl lg:text-3xl">Software developer</p>
				</div>
				<MultipleSentencesTypewriterEffect
					sentences={sentences}
					className="text-xs xs:text-base sm:text-xl md:text-3xl lg:text-5xl"
					cursorClassName="xs:h-5 sm:h-6 md:h-8 lg:h-12 md:w-1.5"
				/>

				<Link
					href="/contact"
					className="relative inline-flex overflow-hidden rounded-full p-1 text-xl font-bold text-black focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:text-white md:text-3xl"
				>
					<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
					<span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-4 py-2 backdrop-blur-3xl">
						Contact Me
					</span>
				</Link>
				<BottomGradient />
			</div>
		</section>
	);
};
