"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { SectionTitle } from "@/components/ui/section-title";

export const Skills = () => {
	return (
		<section className="min-h-screen space-y-10 pt-6 lg:px-40 xl:px-56">
			<SectionTitle title="Skills" />
			<HoverEffect
				items={mySkills}
				className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(230px,1fr))]"
			/>
		</section>
	);
};
const skill = ({ src, title }: { src: string; title: string }) => {
	return (
		<div className="relative z-20 flex h-40 w-full cursor-pointer flex-col items-center justify-between gap-8 rounded-2xl bg-zinc-100 p-4 shadow-lg ring-teal-500 transition-all duration-500 group-hover:ring-2 dark:bg-black md:h-56">
			<Image src={src} alt={title} width={96} height={96} className="h-16 w-auto md:h-24" />
			<h3 className="text-2xl font-semibold">{title}</h3>
		</div>
	);
};

const mySkills: ReactNode[] = [
	skill({
		title: "React.js",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
	}),
	skill({
		title: "Next.js",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
	}),
	skill({
		title: "PHP",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
	}),
	skill({
		title: "TypeScript",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
	}),
	skill({
		title: "Node.js",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg",
	}),
	skill({
		title: "MySQL",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-plain-wordmark.svg",
	}),
	skill({
		title: "PostgreSQL",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
	}),
	skill({
		title: "Tailwindcss",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
	}),
];
