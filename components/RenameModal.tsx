"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

function RenameModal() {
	const { user } = useUser();
	const [input, setInput] = useState("");

	const [isRenameModalOpen, setIsRenameModalOpen, fileId, setFileId, filename] =
		useAppStore((state) => [
			state.isRenameModalOpen,
			state.setIsRenameModalOpen,
			state.fileId,
			state.setFileId,
			state.filename,
		]);

	const renameFile = async () => {
		if (!user || !fileId) return;

		await updateDoc(doc(db, "users", user.id, "files", fileId), {
			filename: input,
		});
		setInput("");
		setIsRenameModalOpen(false);
	};

	return (
		<Dialog
			open={isRenameModalOpen}
			onOpenChange={(isOpen) => {
				setIsRenameModalOpen(isOpen);
			}}
		>
			<DialogContent className="sm:max-w-amd">
				<DialogHeader>
					<DialogTitle>Rename the file</DialogTitle>
					<Input
						id="link"
						defaultValue={filename}
						onChange={(e) => setInput(e.target.value)}
						onKeyDownCapture={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								renameFile();
							}
						}}
					/>
				</DialogHeader>

				<DialogFooter className="flex space-x-2 py-3">
					<Button
						type="submit"
						size="sm"
						className="px-3 flex-1"
						variant={"ghost"}
						onClick={() => setIsRenameModalOpen(false)}
					>
						<span className="sr-only">Cancel</span>
						<span>Cancel</span>
					</Button>

					<Button
						type="submit"
						size="sm"
						className="px-3 flex-1"
						variant={"ghost"}
						onClick={() => renameFile()}
					>
						<span className="sr-only">Rename</span>
						<span>Rename</span>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default RenameModal;
