import Main from "./components/Main";
import NavBar from "./components/NavBar";
import ProfileBar from "./components/ProfileBar";
import SideBar from "./components/SideBar";

export default function Home() {
  return (
    <div className=" flex flex-row gap-1 h-screen bg-gray-100">
      <section className="w-60 min-w-40 bg-primary max-md:hidden">
        <SideBar />
      </section>
      <main className="main border border-zinc-500 flex flex-1 min-w-96">
        <Main />
      </main>
      <section className="profileBar bg-teal-600 flex w-60 max-lg:hidden">
        <ProfileBar />
      </section>
    </div>
  );
}

{
  /* <nav className="sideBar grid col-span-1 bg-stone-500 rounded-e-md">
        <NavBar />
      </nav> */
}
