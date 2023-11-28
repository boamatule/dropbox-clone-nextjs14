import { SignIn, SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggler } from "./ThemeToggler";
const Header = () => {
	return (
		<header className="flex items-center justify-between">
			<Link href="/" className="flex items-center space-x-2">
				<div className="w-fit bg-[#0160FE]">
					<Image
						src="https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png"
						alt="Dropbox Logo"
						height={50}
						width={50}
						className="invert"
					/>
				</div>
				<h1 className="font-bold text-xl">Dropbox</h1>
			</Link>

      <div className="flex px-5 space-x-2 items-center">
				<ThemeToggler />
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal"/>
        </SignedOut>
      </div>
		</header>
	);
};

export default Header;
