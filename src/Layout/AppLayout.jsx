import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { IoReorderThreeSharp } from "react-icons/io5";
import { NavigasiMobile } from "../Component/NavigasiMobile";
import { useSelector, useDispatch } from "react-redux";
import { toggleNavigasiMobile } from "../features/toggleSlice";
import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

export const AppLayout = () => {
  const toggle = useSelector((state) => state.toggle.nilaiToggleNavigasiMobile);
  const dispatch = useDispatch();
  const router = useRouterState();
  const path = router.location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate({ to: "/login", replace: true });
    }
  }, [navigate]);

  return (
    <>
      <header className="flex justify-between bg-white p-5 items-center px-5 sm:px-10 md:15px lg:px-20  border-b-2 border-black font-mono fixed z-50 w-full ">
        <Link to={"/"} className="flex items-center gap-2">
          <img src="/assets/Logo.png" alt="logo" />
          <p className="font-medium text-xl">SIMS PPOB</p>
        </Link>
        <nav>
          <ul className="hidden md:flex sm:gap-10">
            <Link
              to={"/topup"}
              className={`${path === "/topup" ? "text-red-500" : "text-black"}`}
            >
              Top Up
            </Link>
            <Link
              to={"/transaction"}
              className={`${
                path === "/transaction" ? "text-red-500" : "text-black"
              }`}
            >
              Transaction
            </Link>
            <Link
              to={"/akun"}
              className={`${path === "/akun" ? "text-red-500" : "text-black"}`}
            >
              Akun
            </Link>
          </ul>
          <button
            onClick={() => dispatch(toggleNavigasiMobile())}
            className="md:hidden flex border-0 p-0 cursor-pointer"
          >
            <IoReorderThreeSharp className=" text-black text-4xl" />
          </button>
        </nav>
      </header>
      <NavigasiMobile
        toggle={toggle}
        setToggle={() => dispatch(toggleNavigasiMobile())}
      />
      <Outlet />
    </>
  );
};
