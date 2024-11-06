"use client";

import { Check, MoonIcon, SunIcon, SunMoon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const ThemePicker = () => {
	const { theme, themes, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button variant="ghost" size="icon" className="overflow-hidden">
				<SunMoon className="h-6 w-6 shrink-0" />
			</Button>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="overflow-hidden" asChild>
				<Button variant="ghost" size="icon">
					{theme === "light" && <SunIcon className="h-6 w-6 shrink-0" />}
					{theme === "dark" && <MoonIcon className="h-6 w-6 shrink-0" />}
					{theme === "system" && <SunMoon className="h-6 w-6 shrink-0" />}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-36">
				{themes.map((th) => (
					<DropdownMenuItem
						key={th}
						onClick={() => setTheme(th)}
						className="flex items-center capitalize"
					>
						<Check className={cn("mr-2 h-4 w-4", theme === th ? "opacity-100" : "opacity-0")} />
						{th}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
