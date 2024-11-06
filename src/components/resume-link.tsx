"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";


export const ResumeLink = () => {
	const t = useTranslations('links')
	return (
		<div className="group relative block self-stretch">
			<div className="absolute inset-0 -z-10 rounded-md bg-teal-300"></div>
			<a
				href="https://docs.google.com/document/d/17nVO9zG1l-wJlLQa1ytyxN6gyh6gAvjJ-Jykl2TpVb0/export?format=pdf"
				target="_blank"
				rel="noreferrer"
				className="flex h-full flex-col items-center justify-center rounded-md border border-teal-300 font-bold duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1"
				// onClick={() => registerAction({ action: "download-resume" })}
			>
				<Button variant="outline">{t('resume')}</Button>
			</a>
		</div>
	);
};
