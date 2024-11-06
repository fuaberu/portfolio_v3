"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export const WorkExperience = () => {
	const t = useTranslations("portfolio.experience");

	const experiences = [
		{
			company: "Logon",
			role: t("logon.role"),
			period: t("logon.period"),
			achievements: [
				t("logon.achievements.payment"),
				t("logon.achievements.facial"),
				t("logon.achievements.api"),
			],
		},
	];

	return (
		<section className="relative min-h-screen space-y-10 py-6 2xl:mx-36">
			<SectionTitle title={t("title")} />
			<motion.div
				className="space-y-8 rounded-md bg-slate-200 px-4 py-8 dark:bg-slate-900 lg:px-10"
				initial={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
			>
				{experiences.map((experience, index) => (
					<div key={experience.company} className="space-y-4">
						<div className="space-y-1">
							<h3 className="text-2xl font-bold">
								{experience.role} | {experience.company}
							</h3>
							<p className="text-sm text-slate-600 dark:text-slate-400">{experience.period}</p>
						</div>
						<ul className="list-disc space-y-2 pl-4 text-slate-700 dark:text-slate-300">
							{experience.achievements.map((achievement, i) => (
								<li key={i}>{achievement}</li>
							))}
						</ul>
					</div>
				))}
			</motion.div>
		</section>
	);
};
