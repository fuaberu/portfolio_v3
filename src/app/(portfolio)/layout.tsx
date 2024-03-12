import { FloatingNav } from "@/components/ui/floating-navbar";
import { AtSign, Home } from "lucide-react";
import Footer from "@/components/ui/footer";
import { cookies } from "next/headers";
import { Theme } from "@/types";
import { AnalyticsHandler } from "./_components/analytics-handler";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: "%s | Portfolio",
		default: "Portfolio",
	},
};

export default function RootLayout({
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

	return (
		<>
			<header>
				<FloatingNav navItems={navItems} theme={theme} />
			</header>
			<main className="relative mx-auto w-full flex-1">{children}</main>
			<Footer navItems={navItems} theme={theme} />
			<AnalyticsHandler />
		</>
	);
}

const navItems = [
	{
		name: "Home",
		link: "/",
		icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
	},
	{
		name: "Contact",
		link: "/contact",
		icon: <AtSign className="h-4 w-4 text-neutral-500 dark:text-white" />,
	},
];
