import { Link } from "@tanstack/react-router";
import { IoMdCloseCircle } from "react-icons/io";
import { useRouterState } from "@tanstack/react-router";

export const NavigasiMobile = ({ toggle, setToggle }) => {
  const router = useRouterState();
  const path = router.location.pathname;

  return (
    <div className={`${toggle} fixed inset-0 flex w-full z-100 font-mono`}>
      <button
        className=" bg-black/50 w-[30%] min-[500px]:w-[50%] cursor-pointer"
        onClick={setToggle}
      ></button>
      <nav className="w-[70%] min-[500px]:w-[50%] bg-red-500 p-6">
        <ul className="flex flex-col gap-5 text-white">
          <button
            onClick={setToggle}
            type="button"
            className="flex justify-end cursor-pointer"
          >
            <IoMdCloseCircle className=" text-white text-3xl" />
          </button>
          <Link
            to={"/topup"}
            className={`${
              path === "/topup"
                ? "bg-white text-red-500"
                : "bg-red-500 text-white"
            } py-1 px-3 rounded-lg`}
          >
            Top Up
          </Link>
          <Link
            to={"/transaction"}
            className={`${
              path === "/transaction"
                ? "bg-white text-red-500"
                : "bg-red-500 text-white"
            } py-1 px-3 rounded-lg`}
          >
            Transaction
          </Link>
          <Link
            to={"/akun"}
            className={`${
              path === "/akun"
                ? "bg-white text-red-500"
                : "bg-red-500 text-white"
            } py-1 px-3 rounded-lg`}
          >
            Akun
          </Link>
        </ul>
      </nav>
    </div>
  );
};
