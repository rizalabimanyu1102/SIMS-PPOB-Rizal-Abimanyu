import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { togglePasswordNominal } from "../features/toggleSlice";
import { useEffect, useState } from "react";
import axios from "axios";

export const MenuProfilSaldo = () => {
  const [nominal, setNominal] = useState(0);
  const [namaDepan, setNamaDepan] = useState(null);
  const [namaBelakang, setNamaBelakang] = useState(null);
  const [fotoProfil, setFotoProfil] = useState(
    "https://minio.nutech-integrasi.com/take-home-test/null"
  );
  const toggle = useSelector((state) => state.toggle.nilaiToggleNominal);
  const dispatch = useDispatch();

  const formatted = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
  }).format(nominal);

  const profileResponse = async () => {
    try {
      const res = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/profile",
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
    const profilePromise = async () => {
      const res = await profileResponse();
      setNamaDepan(res?.data?.first_name);
      setNamaBelakang(res?.data?.last_name);
      setFotoProfil(res?.data?.profile_image);
    };

    const balancePromise = async () => {
      const res = await balanceResponse();
      setNominal(res?.data?.balance);
    };

    profilePromise();
    balancePromise();
  }, []);

  return (
    <>
      {/* MENU PROFIL DAN SALDO*/}
      <div className="flex flex-col lg:flex-row px-5 sm:px-10 md:px-15 lg:px-20 justify-between mt-10 gap-10 lg:gap-0">
        {/* MENU PROFIL */}
        <div className="flex flex-col gap-3 w-full lg:w-[35%] py-2">
          <img
            src={
              fotoProfil ===
              "https://minio.nutech-integrasi.com/take-home-test/null"
                ? "/assets/Profile Photo.png"
                : fotoProfil
            }
            className="size-[50px] rounded-full border-1 border-gray-300 object-cover"
            alt={
              fotoProfil ===
              "https://minio.nutech-integrasi.com/take-home-test/null"
                ? "/assets/Profile Photo.png"
                : fotoProfil
            }
          />
          <div>
            <p>Selamat datang,</p>
            <p className="text-4xl font-bold">
              {namaDepan} {namaBelakang}
            </p>
          </div>
        </div>
        {/* MENU SALDO*/}
        <div className="flex flex-col w-full lg:w-[60%] h-[150px] min-[500px]:h-[220px] justify-around py-4 px-7 rounded-2xl text-white bg-[url('/assets/Background-Saldo.png')] bg-no-repeat bg-cover">
          <p>Saldo anda</p>
          <div className="flex gap-3">
            <p className="text-2xl min-[400px]:text-4xl font-bold">Rp</p>
            <input
              type={toggle}
              className="text-2xl min-[400px]:text-4xl w-full font-bold p-0"
              value={toggle === "password" ? 1234567 : formatted}
              disabled
            />
          </div>
          <div className="flex items-center gap-2 pb-1 max-[500px]:text-[9px]">
            <p>Lihat saldo</p>
            <button
              className="flex cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                dispatch(togglePasswordNominal());
              }}
            >
              {toggle === "password" ? (
                <IoEyeOutline className=" m-auto" />
              ) : (
                <IoEyeOffOutline className=" m-auto" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
