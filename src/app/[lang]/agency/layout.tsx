import { FloatingNav } from "@/components/ui/floating-navbar";
import Footer from "@/components/ui/footer";
import { Locale, defaultLocale } from "@/lib/I18n";
import { Theme } from "@/types";
import { Home } from "lucide-react";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { getDictionary } from "../../translations";

export const metadata: Metadata = {
	title: {
		template: "%s | Agency",
		default: "Agency",
	},
};

export default async function Layout({
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

	return (
		<>
			<header>
				<FloatingNav navItems={navItems} theme={theme} isAgency translations={translations.links} />
			</header>
			<main className="relative mx-auto w-full max-w-screen-2xl flex-1 px-2 pt-24">{children}</main>
			<Footer navItems={navItems} theme={theme} isAgency translations={translations.links} />
		</>
	);
}

const navItems = [
	{
		name: "Home",
		link: "/agency",
		icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
	},
];
