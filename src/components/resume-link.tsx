"use client";

import { registerAction } from "@/app/actions";
import { Button } from "@/components/ui/button";

interface Props {
	translations: {
		resume: string;
	};
}

export const ResumeLink = ({ translations }: Props) => {
	return (
		<div className="group relative block self-stretch">
			<div className="absolute inset-0 -z-10 rounded-md bg-teal-300"></div>
			<a
				href="https://docs.google.com/document/d/17nVO9zG1l-wJlLQa1ytyxN6gyh6gAvjJ-Jykl2TpVb0/export?format=pdf"
				target="_blank"
				rel="noreferrer"
				className="flex h-full flex-col items-center justify-center rounded-md border border-teal-300 font-bold duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1"
				onClick={() => registerAction({ action: "download-resume" })}
			>
				<Button variant="outline">{translations.resume}</Button>
			</a>
		</div>
	);
};
