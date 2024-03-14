import { Button } from "@/components/ui/button";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Footer from "@/components/ui/footer";
import { Locale, defaultLocale } from "@/lib/I18n";
import { ArrowLeft, AtSign, Home } from "lucide-react";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { getDictionary } from "./translations";
import { Theme } from "@/types";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	const locale: Locale = (headers().get("x-locale") as Locale) || defaultLocale;

	const translations = await getDictionary(locale);

	return {
		title: translations.not_found.metadata.title,
	};
}

const NotFound = async () => {
	const themeCookie = cookies().get("theme");
	// current theme from cookies
	const theme = themeCookie
		? themeCookie.value === "dark"
			? Theme.dark
			: Theme.light
		: Theme.dark;

	const locale: Locale = (headers().get("x-locale") as Locale) || defaultLocale;

	const translations = await getDictionary(locale);

	const navItems = [
		{
			name: translations.links.home,
			link: "/",
			icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
		},
		{
			name: translations.links.contact,
			link: "/contact",
			icon: <AtSign className="h-4 w-4 text-neutral-500 dark:text-white" />,
		},
	];

	return (
		<>
			<header>
				<FloatingNav navItems={navItems} theme={theme} translations={translations.links} />
			</header>
			<main className="relative mx-auto mt-28 w-full flex-1">
				<div className="mx-auto w-full max-w-md space-y-6 text-center">
					<h2 className="text-2xl font-bold">{translations.not_found.h2}</h2>
					<p className="font-medium">{translations.not_found.p}</p>
					<Link className="flex items-center justify-center gap-3" href={"/" + locale}>
						<Button>
							<ArrowLeft />
							<span>{translations.not_found.back}</span>
						</Button>
					</Link>
				</div>
			</main>
			<Footer navItems={navItems} theme={theme} translations={translations.links} />
		</>
	);
};

export default NotFound;
