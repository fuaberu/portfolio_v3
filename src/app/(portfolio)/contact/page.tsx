import { GetInTouchForm } from "@/app/(portfolio)/_components/get-in-touch-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact",
};

const page = () => {
	return (
		<div className="min-h-screen px-2 pb-4 pt-24 md:pt-28">
			<GetInTouchForm />
		</div>
	);
};

export default page;
