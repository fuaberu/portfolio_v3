import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { stripe } from "@/lib/stripe";
import { ArrowBigDown } from "lucide-react";

const page = async ({ params }: { params: { invoiceId: string } }) => {
	const invoice = await stripe.invoices.retrieve(params.invoiceId);

	return (
		<div>
			<div>
				<h2>{params.invoiceId}</h2>
				for <span>{invoice.total}</span>
				<span>{invoice.status}</span>
			</div>
			<Separator />

			<div className="flex items-center justify-between">
				<h3>Summary</h3>
				{invoice.invoice_pdf && (
					<Button asChild>
						<a href={invoice.invoice_pdf}>
							<ArrowBigDown /> Invoice PDF
						</a>
					</Button>
				)}
			</div>
			<section className="grid grid-cols-2">
				<div>
					<div>
						<h4>Billed to:</h4>
						<p>{invoice.customer_email}</p>
					</div>
					<div>
						<h4>Name:</h4>
						<p>{invoice.customer_name}</p>
					</div>
					<div>
						<h4>Address:</h4>
						<p>{invoice.customer_address?.city}</p>
					</div>
					<div>
						<h4>Phone number:</h4>
						<p>{invoice.customer_phone}</p>
					</div>
					<div>
						<h4>Currency:</h4>
						<p>{invoice.currency}</p>
					</div>
				</div>
				<div></div>
			</section>
		</div>
	);
};

export default page;
