"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useAppStore } from "@/store/store";
import { FileType } from "@/typings";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import DeleteModal from "../DeleteModal";
import RenameModal from "../RenameModal";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const [setIsRenameModalOpen, setFileId, setFilename, setIsDeleteModalOpen] =
		useAppStore(state => [
			state.setIsRenameModalOpen,
			state.setFileId,
			state.setFilename,
			state.setIsDeleteModalOpen,
		]);

	const openRenameModal = (fileId: string, filename: string) => {
		setFileId(fileId);
		setFilename(filename);
		setIsRenameModalOpen(true);
	};

	const openDeleteModal = (fileId: string) => {
		setFileId(fileId);
		setIsDeleteModalOpen(true);
	};
	return (
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
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
											  )}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								<DeleteModal />
								<RenameModal />
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{cell.column.id === "timestamp" ? (
											<div className="flex flex-col">
												<div className="text-sm text-gray-500">
													{(cell.renderValue() as Date).toLocaleDateString()}
												</div>
												<div className="text-xs text-gray-400">
													{(cell.renderValue() as Date).toLocaleTimeString()}
												</div>
											</div>
										) : cell.column.id === "filename" ? (
											<p
												className="underline items-center flex text-blue-500 hover:cursor-pointer"
												onClick={() => {
													openRenameModal(
														(row.original as FileType).id,
														(row.original as FileType).filename,
													);
												}}
											>
												{cell.renderValue() as string}
												<PencilIcon className="ml-2" size={15} />
											</p>
										) : (
											flexRender(cell.column.columnDef.cell, cell.getContext())
										)}
									</TableCell>
								))}

								<TableCell key={(row.original as FileType).id}>
									<Button
										variant={"outline"}
										onClick={() => {
											openDeleteModal((row.original as FileType).id);
										}}
									>
										<TrashIcon size={20} />
									</Button>
								</TableCell>
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
	);
}
