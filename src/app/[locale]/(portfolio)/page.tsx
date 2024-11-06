import { TracingBeam } from "@/components/ui/tracing-beam";
import { Hero } from "../_components/hero";
import { Skills } from "../_components/skills";
import { Projects } from "../_components/projects";
import { Contact } from "../_components/contact";
import { WorkExperience } from "../_components/work-experience";

export default function Page() {
	return (
		<>
			<div className="absolute inset-x-0 top-0 -z-10 h-screen">
				<div className="relative h-full w-full">
					<div className="absolute inset-0 bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#272727_1px,transparent_1px)]"></div>
					<div className="absolute inset-x-0 -bottom-5 h-10 bg-gradient-to-t from-background xl:h-32"></div>
				</div>
			</div>
			<TracingBeam className="max-w-screen-2xl px-2 md:px-6">
				<Hero />
				<WorkExperience />
				<Projects />
				<Skills />
				<Contact />
			</TracingBeam>
		</>
	);
}
