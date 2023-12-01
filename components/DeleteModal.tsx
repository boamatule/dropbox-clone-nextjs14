"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

export function DeleteModal() {
	const { user } = useUser();
	const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] =
		useAppStore((state) => [
			state.isDeleteModalOpen,
			state.setIsDeleteModalOpen,
			state.fileId,
			state.setFileId,
		]);

	async function deleteFile() {
		if (!user || !fileId) return;

		const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

		try {
			deleteObject(fileRef)
				.then(async () => {
					deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
						console.log("File deleted successfully");
					});
				})
				.finally(() => {
					setIsDeleteModalOpen(false);
				});
		} catch (error) {
			console.log("Error deleting file", error);
			setIsDeleteModalOpen(false);
		}
	}
	return (
		<Dialog
			open={isDeleteModalOpen}
			onOpenChange={(isOpen) => {
				setIsDeleteModalOpen(isOpen);
			}}
		>
	
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Are you sure you want to delete?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. Are you sure you want to delete this
						file?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="flex space-x-2 py-3">
					<Button
						type="submit"
						size="sm"
						className="px-3 flex-1"
						variant={"ghost"}
						onClick={() => setIsDeleteModalOpen(false)}
					>
						<span className="sr-only">Cancel</span>
						<span>Cancel</span>
					</Button>

					<Button
						type="submit"
						size="sm"
						className="px-3 flex-1"
						variant={"ghost"}
						onClick={() => deleteFile()}
					>
						<span className="sr-only">Delete</span>
						<span>Delete</span>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default DeleteModal;
