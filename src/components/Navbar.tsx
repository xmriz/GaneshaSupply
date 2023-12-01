"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [currentPathName, setCurrentPathName] = useState("");

  const pathName = usePathname();

  useEffect(() => {
    setCurrentPathName(pathName);
  }, [pathName]); // Run this effect only once after mounting

  const navbarData = [
    {
      label: "Pembelian",
      link: "/pembelian",
    },
    {
      label: "Inventori",
      link: "/inventori",
    },
  ];

  return (
    <div>
      <header
        className={`px-5 fixed top-0 left-0 w-full flex items-center py-4 z-10 bg-green`}
      >
        <div className="container relative z-50 mx-auto xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm">
          <div className="flex items-center justify-between relative">
            {/* Logo */}
            <div>
              <Link id="companylogo" href="/" className="flex gap-2 items-center">
                <Image alt="logo" src="/logo/logo.svg" width={50} height={50} />
                <h1 className={`font-bold text-md text-gray`}>
                  GaneshaSupply
                </h1>
              </Link>
            </div>
            {/* Navigasi */}
            <div className="flex items-center px-8">
              {/* hamburger button */}
              <button
                id="hamburger"
                name="hamburger"
                type="button"
                className="flex w-[28px] flex-wrap gap-[6px] absolute z-30 lg:hidden"
                onClick={() => {
                  const hamburger = document.querySelector("#hamburger");
                  const navMenu = document.querySelector("nav.nav-menu");
                  const hamburgerSpan =
                    document.querySelectorAll("#hamburger span");
                  hamburger?.classList.toggle("hamburger-active");
                  navMenu?.classList.toggle("scale-0");
                }}
              >
                <span
                  className={`hamburger-line origin-top-left bg-gray`}
                ></span>
                <span className={`hamburger-line bg-gray`}></span>
                <span
                  className={`hamburger-line origin-bottom-left bg-gray`}
                ></span>
              </button>
              {/* link */}
              <nav className="nav-menu bg-gray scale-0 absolute  shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full duration-500 origin-top-right py-5 lg:py-0 lg:scale-100 lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none lg:transition-colors z-[100]">
                <ul className="flex flex-col gap-1 lg:flex-row lg:gap-8 items-center">
                  {navbarData.map((item) => (
                    <div key={item.label}>
                      <Link href={item.link}>
                        <p
                          className={`cursor-pointer hover:underline 
                        ${
                          currentPathName === item.link
                            ? "text-darkGreen font-bold lg:text-gray"
                            : "text-darkGreen font-normal lg:text-gray"
                        }`}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </div>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
