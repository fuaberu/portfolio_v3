"use client";

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Action, Message, Visit } from "@prisma/client";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";

export type IVisit = Pick<Visit, "id" | "city" | "country" | "createdAt"> & {
	lastAccess: Date | null;
	actions: Pick<Action, "id" | "action" | "createdAt">[];
	messages: Pick<Message, "id">[];
};

export const columns: ColumnDef<IVisit>[] = [
	{
		accessorKey: "id",
		header: "Id",
		cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
	},
	{
		accessorKey: "country",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="m-auto flex text-center capitalize"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					country
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="text-center capitalize">{row.getValue("country")}</div>,
	},
	{
		accessorKey: "city",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="m-auto flex text-center capitalize"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					City
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="text-center capitalize">{row.getValue("city")}</div>,
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="m-auto flex text-center capitalize"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					first access
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="text-center capitalize">
				{row.getValue("createdAt") ? format(row.getValue("createdAt"), "PPPpp") : "-"}
			</div>
		),
	},
	{
		accessorKey: "lastAccess",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="m-auto flex capitalize"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					last access
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="text-center capitalize">
				{row.getValue("lastAccess") ? format(row.getValue("lastAccess"), "PPPpp") : "-"}
			</div>
		),
	},
];

export function StatsTable({ data }: { data: IVisit[] }) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter country..."
					value={(table.getColumn("country")?.getFilterValue() as string) ?? ""}
					onChange={(event) => {
						console.log(table.getColumn("country"));
						table.getColumn("country")?.setFilterValue(event.target.value);
					}}
					className="max-w-sm"
				/>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
