"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Loader from "./Loading";
function Footer() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (status === "authenticated" || status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row  items-center justify-between sm:py-5 py-3 px-8 border-t-4 border-slate-800  text-white mt-10">
          <h1 className="md:text-3xl text-xl mb-2 font-semibold flex items-center">
            Follow us at:
            <Link
              href={"https://www.linkedin.com/in/shaurya-singh-16270b336/"}
              target="_blank">
              <Image
                src={"/linkedin.png"}
                width={45}
                height={45}
                alt="insta"
                className="mx-2"
              />
            </Link>
            <Link href={"https://github.com/Shaurya-singh21"} target="_blank">
              <Image
                src={"/github.png"}
                width={35}
                height={35}
                alt="github"
                className="mx-2"
              />
            </Link>
            <Link href={"https://www.instagram.com/shaurya__singh21?igsh=eGdoOHUzZDl0NHNl"} target="_blank">
              <Image
                src={"/instagram.png"}
                width={40}
                height={40}
                alt="linkedin"
                className="mx-2"
              />
            </Link>
          </h1>
          <span className="md:text-2xl text-sm font-bold">
            &copy; {new Date().getFullYear()} PromptEngine. All rights reserved.
          </span>
        </div>
      )}
    </>
  );
}

export default Footer;
