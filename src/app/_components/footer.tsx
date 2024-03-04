import Image from "next/image";
import { AppLink } from "../../components/ui/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Theme } from "@/types";
import { ResumeLink } from "@/components/ui/resume-link";

const Footer = ({ theme }: { theme: Theme }) => {
	return (
		<footer className="border-t border-neutral-100 p-6 dark:border-white/[0.1]">
			<div className="mx-auto flex max-w-screen-2xl justify-between">
				<div className="space-y-4">
					<h2 className="flex items-center gap-4">
						<Image src="/logo.svg" alt="logo" width={50} height={50} /> Kevin Fabel
					</h2>
					<p>© {new Date().getFullYear()} Kevin Fabel</p>
					<div className="flex items-center gap-2">
						<ModeToggle theme={theme} text={false} />
						<ResumeLink />
					</div>
				</div>
				<nav className="flex flex-col justify-evenly">
					<AppLink href="/">Home</AppLink>
					<AppLink href="/about">About</AppLink>
					<AppLink href="/contact">Contact</AppLink>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
