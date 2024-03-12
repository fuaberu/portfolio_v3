import { db } from "@/lib/db";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	// read route params
	const id = params.id;

	// fetch data
	const product = await db.project.findUnique({
		where: { id },
		select: { name: true },
	});

	if (!product) {
		return {};
	}

	return {
		title: product.name,
	};
}

const page = async ({ params }: Props) => {
	// read route params
	const id = params.id;

	// fetch data
	const product = await db.project.findUnique({
		where: { id },
		select: { name: true },
	});

	return <div>page</div>;
};

export default page;
