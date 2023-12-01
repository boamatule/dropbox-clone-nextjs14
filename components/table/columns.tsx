"use client";

import { COLOR_EXTENSION_MAP } from "@/constants";
import { FileType } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from "react-file-icon";

export const columns: ColumnDef<FileType>[] = [
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ renderValue, ...props }) => {
			const type = renderValue() as string;

			// Check if type is not null and has the expected format
			if (type && type.includes("/")) {
				const extension: string = type.split("/")[1];
				return (
					<div className="w-10">
						<FileIcon
							extension={extension}
							labelColor={COLOR_EXTENSION_MAP[extension]}
							//@ts-ignore
							{...defaultStyles[extension]}
						/>
					</div>
				);
			} else {
				// Handle the case when type is null or doesn't have the expected format
				return <div className="w-10">Invalid Type</div>;
			}
		},
	},
	{
		accessorKey: "filename",
		header: "Filename",
	},
	{
		accessorKey: "timestamp",
		header: "Date Added",
	},
	{
		accessorKey: "size",
		header: "Size",
		cell: ({ renderValue, ...props }) => {
			// Check if renderValue() is not null before passing it to prettyBytes
			const size = renderValue() as number;
			return <span>{size !== null ? prettyBytes(size) : "Invalid Size"}</span>;
		},
	},
	{
		accessorKey: "downloadURL",
		header: "Link",
		cell: ({ renderValue, ...props }) => (
			<a
				href={renderValue() as string}
				target="_blank"
				rel="noreferrer"
				className="text-blue-500 underline hover:text-blue-600"
			>
				Donwload
			</a>
		),
	},
];
