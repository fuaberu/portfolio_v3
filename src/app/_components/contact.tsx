import { SectionTitle } from "@/components/ui/section-title";
import { GetInTouchForm } from "./get-in-touch-form";

export const Contact = () => {
	return (
		<section className="min-h-screen space-y-10 pt-6">
			<SectionTitle title="Contact" />
			<GetInTouchForm />
		</section>
	);
};
