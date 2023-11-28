import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<main className="">
			<div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
				<div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
					<h1 className="font-bold text-5xl">Dropbox clone</h1>

					<p className="text-lg mb-20">
						Welcome to my Dropbox clone. This is a project I made to learn
						Next.js and Tailwind CSS. I used Firebase for the backend.
					</p>

					<Link
						href="/dashboard"
						className="flex cursor-pointer bg-blue-500 p-5 w-fit"
					>
						Try it out!
						<ArrowRight className=" ml-10" />
					</Link>
				</div>
				<div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
					<video autoPlay loop muted className="rounded-lg">
						<source
							src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
							type="video/mp4"
						/>
					</video>
				</div>
			</div>
		</main>
	);
}
