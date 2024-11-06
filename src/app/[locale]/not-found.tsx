import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex h-screen flex-1 flex-col justify-center p-4 text-foreground">
			<div className="mx-auto w-full max-w-md space-y-6 text-center">
				<h2 className="text-6xl font-bold">404</h2>
				<p className="font-medium">
					The page you are looking for does not exist or has been removed.
				</p>
				<Link className="flex items-center justify-center gap-2" href="/">
					<Button>
						<ArrowLeft className="mr-2 h-4 w-4" />
						<span>Go back to the homepage</span>
					</Button>
				</Link>
			</div>
		</main>
	);
}
