"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "./Loading";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/lightswind/dropdown-menu";
import { Info, LogIn, LogOut, Pencil, TextAlignJustify } from "lucide-react";
function Nav() {
  const router = useRouter();
  const { data: session, status } = useSession({ required: false });
  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          {status === "authenticated" ? (
            <nav className="flex items-center justify-between px-1  md:py-5 py-3  md:px-4 border-b-1 border-slate-700 shadow-blue-300 shadow-sm sm:shadow-md text-white">
              <Link href="/">
                <div className="sm:text-3xl relative flex items-center text-3xl font-bold bg-clip-text">
                  <div className="h-10 relative w-10 sm:mr-2">
                    <Image
                      alt="Logo"
                      layout="fill"
                      src={"/logo.png"}
                      objectFit="contain"
                      className="mr-2"
                    />
                  </div>
                  <p className="mr-1 text-green-400">Prompt</p> <p className="text-sky-400">Engine</p>
                </div>
              </Link>

              <span className="flex items-center lg:mr-25 gap-5  ">
                <Link href="/about-us">
                  <div className="rounded-2xl text-shadow-md/30 text-shadow-white  py-2.5 text-slate-300 hover:text-white  hover:bg-gradient-to-r hover:from-slate-800/80 hover:to-gray-800/80  border border-transparent hover:border-slate-600/50 hover:ring-1 ring-gray-800  hidden p-2 font-semibold text-[20px] px-5 cursor-pointer   duration-200 lg:flex items-center  hover:scale-110 transition">
                    <Info className="mr-2" size={20} />
                    About-Us
                  </div>
                </Link>
                <Link href="/create-post">
                  <div className="rounded-2xl text-shadow-md/30 text-shadow-white  py-2.5 text-slate-300 hover:text-white  hover:bg-gradient-to-r hover:from-slate-800/80 hover:to-gray-800/80  border border-transparent hover:border-slate-600/50 hover:ring-1 ring-gray-800  hidden p-2 font-semibold text-[20px] px-5 cursor-pointer   duration-200 lg:flex items-center  hover:scale-110 transition">
                    <Pencil className="mr-2" size={20} />
                    Create-Prompt
                  </div>
                </Link>
                <div
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                  }}
                  className="rounded-2xl text-shadow-md/30 text-shadow-white  py-2.5 text-slate-300 hover:text-white  hover:bg-gradient-to-r hover:from-slate-800/80 hover:to-gray-800/80  border border-transparent hover:border-slate-600/50 hover:ring-1 ring-gray-800  hidden p-2 font-semibold text-[20px] px-5 cursor-pointer   duration-200 lg:flex items-center  hover:scale-110 transition">
                  <LogOut className="mr-2" size={20} />
                  Sign-Out
                </div>

                <DropdownMenu hoverMode={true}>
                  <DropdownMenuTrigger className=" lg:hidden flex items-center ">
                    <TextAlignJustify className=" font-extralight cursor-pointer w-20 h-12" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-900 text-white">
                    <Link href="/profile">
                      <DropdownMenuLabel className="hover:bg-slate-600 cursor-pointer">
                        My Account
                      </DropdownMenuLabel>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href="/create-post">
                      <DropdownMenuLabel className="hover:bg-slate-600 cursor-pointer">
                        Create
                      </DropdownMenuLabel>
                    </Link>
                    <Link href="/about-us">
                      <DropdownMenuLabel className="hover:bg-slate-600 cursor-pointer">
                        About
                      </DropdownMenuLabel>
                    </Link>
                    <DropdownMenuLabel
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                      }}
                      className="hover:bg-red-700/50 cursor-pointer">
                      Sign-out
                    </DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </span>
              <Link
                href="/profile"
                className="rounded-full lg:inline  hidden duration-200  hover:scale-110
             mr-3 md:mr-2 transitions cursor-pointer  w-12 h-12 bg-gray-800">
                <Image
                  src={session?.user.image}
                  alt="profile"
                  width={48}
                  height={48}
                  className="rounded-4xl ring-2 ring-gray-200  "
                />
              </Link>
            </nav>
          ) : (
            <nav className="flex items-center justify-between sm:py-5 py-3 px-5 sm:px-8 border-b-1 border-slate-700 shadow-blue-300 shadow-md text-white">
              <div className="sm:text-5xl relative flex items-center text-3xl font-bold bg-clip-text">
                <div className="h-10 relative w-10 mr-2">
                  <Image
                    alt="Logo"
                    layout="fill"
                    src={"/logo.png"}
                    objectFit="contain"
                    className=""
                  />
                </div>
                <p>Prompt Engine</p>
              </div>
              <Link
                href={"/login-page"}
                className="flex items-center md:text-lg sm:px-8 px-3 py-3 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <LogIn className="sm:mr-2" size={20} />
                <p className="hidden sm:inline-block">Sign In</p>
              </Link>
            </nav>
          )}
        </>
      )}
    </>
  );
}

export default Nav;
