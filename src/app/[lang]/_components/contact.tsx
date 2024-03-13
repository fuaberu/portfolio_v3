import { SectionTitle } from "@/components/ui/section-title";
import { GetInTouchForm } from "./get-in-touch-form";

interface Props {
	translations: {
		title: string;
		h2: string;
		p: string;
		name: string;
		name_placeholder: string;
		email: string;
		email_placeholder: string;
		message: string;
		message_placeholder: string;
		submit: string;
		success: string;
		error: string;
		loading: string;
	};
}

export const Contact = ({ translations }: Props) => {
	return (
		<section className="min-h-screen space-y-10 pt-6">
			<SectionTitle title={translations.title} />
			<GetInTouchForm translations={translations} />
		</section>
	);
};
