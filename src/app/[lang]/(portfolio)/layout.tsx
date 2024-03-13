import { FloatingNav } from "@/components/ui/floating-navbar";
import { AtSign, Home } from "lucide-react";
import Footer from "@/components/ui/footer";
import { cookies, headers } from "next/headers";
import { Theme } from "@/types";
import { AnalyticsHandler } from "../_components/analytics-handler";
import type { Metadata } from "next";
import { getDictionary } from "../translations";
import { Locale, defaultLocale } from "@/lib/I18n";

export async function generateMetadata(): Promise<Metadata> {
	const locale: Locale = (headers().get("x-locale") as Locale) || defaultLocale;

	const translations = await getDictionary(locale);

	return {
		title: {
			template: translations.portfolio.metadata.template,
			default: translations.portfolio.metadata.default,
		},
	};
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
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
			<main className="relative mx-auto w-full flex-1">{children}</main>
			<Footer navItems={navItems} theme={theme} translations={translations.links} />
			<AnalyticsHandler />
		</>
	);
}
