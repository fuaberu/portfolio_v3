import Link from "next/link";
import Form from "./_components/Form";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
	const session = await auth(true);

	if (session) redirect("/agency");

	return (
		<div className="mx-auto mt-24 w-full max-w-md animate-move-up space-y-4 rounded-2xl bg-white p-4 shadow-input dark:bg-black md:p-8">
			<h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
				Register to my agency
			</h2>
			<Form />
			<div className="w-full">
				<p className="w-full text-right">
					Already have an account?{" "}
					<Button variant="link" className="p-0" asChild>
						<Link href="/agency/auth/sign-in">Sign in</Link>
					</Button>
				</p>
			</div>
		</div>
	);
};

export default Page;
