import { GetInTouchForm } from "@/app/[lang]/_components/get-in-touch-form";
import { Locale } from "@/lib/I18n";
import type { Metadata } from "next";
import { getDictionary } from "../../../translations";

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	// read route params
	const translations = await getDictionary(params.lang);

	return {
		title: translations.contact.metadata.title,
	};
}

const page = async ({ params }: Props) => {
	const translations = await getDictionary(params.lang);

	return (
		<div className="min-h-screen px-2 pb-4 pt-24 md:pt-28">
			<GetInTouchForm translations={translations.portfolio.contact} />
		</div>
	);
};

export default page;
