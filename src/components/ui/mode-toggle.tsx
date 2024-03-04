"use client";

import { Theme } from "@/types";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function ModeToggle({ theme, text = true }: { theme: Theme; text?: boolean }) {
	const [_theme, setTheme] = useState<Theme>(theme);

	const toogleTheme = () => {
		const root = document.getElementsByTagName("html")[0];
		root.classList.toggle(Theme.dark);
		if (root.classList.contains(Theme.dark)) {
			setTheme(Theme.dark);
			document.cookie = `theme=${Theme.dark};path=/;max-age=31536000`;
		} else {
			setTheme(Theme.light);
			document.cookie = `theme=${Theme.light};path=/;max-age=31536000`;
		}
	};

	return (
		<button
			className="flex h-10 items-center gap-1 whitespace-nowrap rounded-md bg-zinc-400 p-3 hover:bg-zinc-500 dark:bg-zinc-700 dark:hover:bg-zinc-800"
			onClick={toogleTheme}
		>
			<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			{text && <span className="capitalize">{_theme}</span>}

			<span className="sr-only">Toggle theme</span>
		</button>
	);
}
