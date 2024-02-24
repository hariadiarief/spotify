import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Switch } from "antd";
import { useAppContext } from "@/contexts/appContext";
import { Children, useEffect, useRef, useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { isDark, setIsDark } = useAppContext();

  const myRef = useRef<HTMLDivElement>(null);
  const [positionScrollY, setPositionScrollY] = useState<number>(0);

  useEffect(() => {
    const onScroll = () => {
      setPositionScrollY(window.scrollY);

      if (myRef.current) {
        if (window.scrollY === 0) {
          // top of page condition
          myRef.current.style.top = "0px";
          myRef.current.style.boxShadow = "none";
        } else if (positionScrollY > myRef.current.clientHeight) {
          // scrolled condition
          if (positionScrollY > window.scrollY) {
            // scrolling top
            myRef.current.style.top = "0px";
            myRef.current.style.boxShadow =
              "-0px 5px 5px -5px rgba(0, 0, 0, 0.75)";
          } else {
            // scrolling down
            myRef.current.style.top = `-${myRef.current.clientHeight}px`;
            myRef.current.style.boxShadow = "none";
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [positionScrollY]);

  return (
    <>
    
      <nav className="headers-container flex justify-between px-5 items-center rounded-b-[40%] sticky bg-gradient-to-r from-purple-900 to-purple-500 min-h-[50px]">
        ngmusing
      </nav>
      {children}
    </>
  );
}
