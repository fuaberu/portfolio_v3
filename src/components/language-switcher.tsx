"use client";

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "@/lib/I18n/link";

export default function LanguageSwitcher() {
	const pathname = usePathname();

	return (
		<Menubar className="border-none p-0">
			<MenubarMenu>
				<MenubarTrigger asChild className="hover:cursor-pointer">
					<Button variant="outline" size="icon">
						<Languages size={20} />
					</Button>
				</MenubarTrigger>
				<MenubarContent>
					<Link href={pathname} locale="en">
						<MenubarItem className="hover:cursor-pointer">English</MenubarItem>
					</Link>
					<Link href={pathname} locale="jp">
						<MenubarItem className="hover:cursor-pointer">日本語</MenubarItem>
					</Link>
					<Link href={pathname} locale="pt">
						<MenubarItem className="hover:cursor-pointer">Português</MenubarItem>
					</Link>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
}
