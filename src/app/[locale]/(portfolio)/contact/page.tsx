import { GetInTouchForm } from "@/app/[locale]/_components/get-in-touch-form";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = await props.params;

	const { locale } = params;

	const t = await getTranslations({ locale, namespace: "contact.metadata" });

	return {
		title: t("title"),
	};
}

const page = async () => {
	return (
		<div className="min-h-screen px-2 pb-4 pt-24 md:pt-28">
			<GetInTouchForm />
		</div>
	);
};

export default page;
