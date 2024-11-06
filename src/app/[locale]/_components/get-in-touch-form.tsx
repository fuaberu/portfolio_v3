"use client";

import { Linkedin, Mail } from "lucide-react";
import { BottomGradient } from "../../../components/bottom-gradient";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export const GetInTouchForm = () => {
	const t = useTranslations("portfolio.contact");

	return (
		<motion.div
			initial={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			className="mx-auto w-full max-w-md rounded-2xl bg-white p-4 shadow-input dark:bg-black md:p-8"
		>
			<h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">{t("h2")}</h2>
			<p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">{t("p")}</p>

			<div className="mt-8 flex flex-col space-y-4">
				<a
					className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
					href="mailto:kevinfabe@gmail.com"
				>
					<Mail className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
					<span className="text-sm text-neutral-700 dark:text-neutral-300">
						kevinfabe@gmail.com
					</span>
					<BottomGradient />
				</a>
				<a
					className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
					href="https://www.linkedin.com/in/kevin-fabel/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Linkedin className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
					<span className="text-sm text-neutral-700 dark:text-neutral-300">LinkedIn</span>
					<BottomGradient />
				</a>
			</div>
		</motion.div>
	);
};
