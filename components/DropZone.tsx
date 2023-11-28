"use client";

import { cn } from "@/lib/utils";
import DropZoneComponent from "react-dropzone";

const DropZone = () => {
  // maz file size 20MB
  const maxSize = 20971520;

	return (
		<DropZoneComponent
			minSize={0}
			maxSize={maxSize}
			onDrop={(acceptedFiles) => console.log(acceptedFiles)}
		>
			{({
				getRootProps,
				getInputProps,
				isDragActive,
				isDragAccept,
				isDragReject,
				fileRejections,
			}) => {
				const isFileTooLarge =
					fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

				return (
					<section className="m-4">
						<div 
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex justify-center items-center border-dashed rounded-lg text-center p-5",
                isDragActive ? "bg-[#035FFE] text-white animate-pulse" : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
              )}
            >
							<input {...getInputProps()} />
							{!isDragActive && "Click here or drop a file to upload!"}
							{isDragActive && !isDragReject && "Drop it like it's hot!"}
							{isDragReject && "File type not accepted, sorry!"}
							{isFileTooLarge && (
								<div className="text-danger mt-2">File is too large.</div>
							)}
						</div>
					</section>
				);
			}}
		</DropZoneComponent>
	);
};

export default DropZone;
