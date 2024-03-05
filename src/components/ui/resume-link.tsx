"use client";

import { registerAction } from "@/app/actions";
import Link from "next/link";

export const ResumeLink = () => {
	return (
		<div className="group relative block self-stretch">
			<div className="absolute inset-0 -z-10 rounded-md bg-teal-300"></div>
			<a
				href="/resume.pdf"
				target="_blank"
				className="flex h-full flex-col items-center justify-center rounded-md border border-teal-300 bg-zinc-400 p-3 px-4 py-2 font-bold duration-200 hover:bg-zinc-500 group-hover:-translate-x-1 group-hover:-translate-y-1 dark:bg-zinc-700 dark:hover:bg-zinc-800"
				onClick={() => registerAction({ action: "download-resume" })}
			>
				Resume
			</a>
		</div>
	);
};
