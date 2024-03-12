import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { InvoiceUpsertForm } from "../_forms/invoice-form";

interface Props {
	customerId: string;
}

export function CreateInvoiceModal({ customerId }: Props) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost">New Invoice</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Create Invoice</SheetTitle>
					<SheetDescription>Create an invoice foi this project.</SheetDescription>
				</SheetHeader>
				<InvoiceUpsertForm customerId={customerId} />
			</SheetContent>
		</Sheet>
	);
}
