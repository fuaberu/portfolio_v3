"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckIcon, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { routing, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { cn } from "@/utils/cn";

export default function LanguageSwitcher() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const pathname = usePathname();
	const locale = useLocale();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	function onSelectLocale(nextLocale: (typeof routing.locales)[number]) {
		startTransition(() => {
			router.push(pathname, { locale: nextLocale, scroll: false });
		});
	}

	if (!mounted) {
		return (
			<Button variant="outline" size="icon">
				<Languages size={20} />
			</Button>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" disabled={isPending}>
					<Languages size={20} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{routing.locales.map((cur) => (
					<DropdownMenuItem
						key={cur}
						className="flex items-center gap-2"
						onClick={() => onSelectLocale(cur)}
						disabled={isPending}
					>
						<CheckIcon
							className={cn("h-4 w-4 text-emerald-400", {
								"opacity-0": cur !== locale,
							})}
						/>
						{cur === "en" ? "English" : cur === "ja" ? "日本語" : "Português"}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
