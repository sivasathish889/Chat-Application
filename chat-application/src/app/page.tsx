"use client";
import { Suspense, useState } from "react";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import ProfileBar from "./components/ProfileBar";
import SideBar from "./components/SideBar";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

export default function Home() {
  const expandNav = useSelector((state: RootState) => state.expandNav);
  return (
    <div className="flex flex-row gap-1 h-screen bg-gray-100">
      <nav
        className={`sideBar bg-stone-500 rounded-e-md transition-all duration-300 ${
          expandNav ? "w-10" : "w-24"
        }`}
      >
        <NavBar />
      </nav>
      <section className="w-60 min-w-40 bg-primary max-md:hidden transition-all duration-300">
        <Suspense fallback={"Loading..."}>
          <SideBar />
        </Suspense>
      </section>
      <main className="main border border-zinc-500 flex flex-1 min-w-96 transition-all duration-300">
        <Main />
      </main>
      {/* <section className="profileBar bg-teal-600 flex w-60 max-lg:hidden transition-all duration-300">
      <ProfileBar />
      </section> */}
    </div>
  );
}
