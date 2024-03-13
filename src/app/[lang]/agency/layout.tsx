import { FloatingNav } from "@/components/ui/floating-navbar";
import Footer from "@/components/ui/footer";
import { Theme } from "@/types";
import { Home } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
	title: {
		template: "%s | Agency",
		default: "Agency",
	},
};

export default function Layout({
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
				<FloatingNav navItems={navItems} theme={theme} isAgency />
			</header>
			<main className="relative mx-auto w-full max-w-screen-2xl flex-1 px-2 pt-24">{children}</main>
			<Footer navItems={navItems} theme={theme} isAgency />
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
