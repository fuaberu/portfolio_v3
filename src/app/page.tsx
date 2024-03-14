import { TracingBeam } from "@/components/ui/tracing-beam";
import { Hero } from "./[lang]/_components/hero";
import { Skills } from "./[lang]/_components/skills";
import { Projects } from "./[lang]/_components/projects";
import { Contact } from "./[lang]/_components/contact";
import { getDictionary } from "./translations";

export default async function Page() {
	const translations = await getDictionary("en");

	return (
		<>
			<div className="absolute inset-x-0 top-0 -z-10 h-screen">
				<div className="relative h-full w-full">
					<div className="absolute inset-0 bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#272727_1px,transparent_1px)]"></div>
					<div className="absolute inset-x-0 -bottom-5 h-10 bg-gradient-to-t from-background xl:h-32"></div>
				</div>
			</div>
			<TracingBeam className="max-w-screen-2xl px-2 md:px-6">
				<Hero locale={"en"} translations={translations.portfolio.hero} />
				<Skills translations={translations.portfolio.skills} />
				<Projects translations={translations.portfolio.projects} />
				<Contact translations={translations.portfolio.contact} />
			</TracingBeam>
		</>
	);
}
