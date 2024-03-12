import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { InvoicesTable } from "./_components/invoices-table";
import { CreateInvoiceModal } from "./_components/CreateInvoiceModal";
import { db } from "@/lib/db";

const page = async ({ params }: { params: { id: string } }) => {
	const project = await db.project.findUnique({
		where: { id: params.id },
		include: {
			users: {
				select: {
					id: true,
					role: true,
					user: { select: { id: true, name: true, customerId: true } },
				},
			},
		},
	});

	let invoices: Stripe.Invoice[] = [];

	try {
		const owner = project?.users.find((user) => user.role === "OWNER")?.user;

		if (owner && owner.customerId) {
			const res = await stripe.invoices.list({ customer: owner?.customerId || "" });
			invoices = res.data;
		}
	} catch (error) {
		invoices = [];
	}

	return (
		<div>
			<div className="flex items-center justify-between">
				<h2 className="text-3xl">Invoices</h2>
				<CreateInvoiceModal customerId={params.id} />
			</div>
			<InvoicesTable data={invoices} />
		</div>
	);
};

export default page;
