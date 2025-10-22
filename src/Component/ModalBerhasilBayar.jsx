import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

export const ModalBerhasilBayar = ({
  service,
  price,
  hideModal2,
  setHideModal2,
}) => {
  const [saldo, setSaldo] = useState(0);
  const navigate = useNavigate();

  const balanceResponse = async () => {
    try {
      const res = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/balance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res?.data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const balancePromise = async () => {
      const res = await balanceResponse();
      setSaldo(res?.data?.balance);
    };

    balancePromise();
  }, []);

  const handleModal = (e) => {
    e.preventDefault();
    setHideModal2(false);
    navigate({ to: "/", replace: true });
  };
  return (
    <div
      className={`fixed ${
        hideModal2 && Number(price) <= saldo ? "flex" : "hidden"
      } bg-black/50 w-screen h-screen inset-0 justify-center items-center text-white z-1000`}
    >
      <div className=" bg-white flex flex-col items-center gap-5 text-black px-8 min-[350px]:px-13 sm:px-18 py-5 rounded-lg shadow-2xl">
        <IoCheckmarkCircle className=" text-green-500 text-7xl" />
        <div className="flex flex-col items-center">
          <p className="text-center">{service}</p>
          <p className="text-2xl sm:text-4xl font-bold">
            Rp{new Intl.NumberFormat("id-ID").format(price)}
          </p>
          <p>berhasil!</p>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <button
            type="submit"
            onClick={handleModal}
            className=" text-red-500 p-2 cursor-pointer"
          >
            Kembali ke beranda
          </button>
        </div>
      </div>
    </div>
  );
};
