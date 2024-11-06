"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { GetInTouchForm } from "./get-in-touch-form";
import { useTranslations } from "next-intl";

export const Contact = () => {
	const t = useTranslations("portfolio.contact");
	
	return (
		<section className="min-h-screen space-y-10 pt-6">
			<SectionTitle title={t("title")} />
			<GetInTouchForm />
		</section>
	);
};
