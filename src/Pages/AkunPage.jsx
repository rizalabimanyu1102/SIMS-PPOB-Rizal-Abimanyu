import { Link, useNavigate } from "@tanstack/react-router";
import { MdAlternateEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";

const AkunPage = () => {
  const [email, setEmail] = useState("");
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [fotoProfil, setFotoProfil] = useState(
    "https://minio.nutech-integrasi.com/take-home-test/null"
  );
  const navigate = useNavigate();

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

  useEffect(() => {
    const profilePromise = async () => {
      const res = await profileResponse();
      setEmail(res?.data?.email);
      setNamaDepan(res?.data?.first_name);
      setNamaBelakang(res?.data?.last_name);
      setFotoProfil(res?.data?.profile_image);
    };

    profilePromise();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate({ to: "/login", replace: true });
    alert("Log Out Berhasil!");
  };

  return (
    <>
      {/* AKUN PAGE */}
      <div className=" flex justify-center">
        {/* INPUT PROFIL, EMAIL, NAMA DEPAN, NAMA BELAKANG & TOMBOL EDIT PROFIL, TOMBOL LOG OUT */}
        <form className="flex flex-col w-full md:w-[900px] gap-3 pt-25 pb-5 px-5 min-[400px]:px-10 md:px-30">
          {/* INPUT PROFIL */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative flex size-[150px]">
              <img
                src={
                  fotoProfil ===
                  "https://minio.nutech-integrasi.com/take-home-test/null"
                    ? "/assets/Profile Photo.png"
                    : fotoProfil
                }
                className="relative size-[150px] rounded-full border-2 border-gray-400 object-cover"
                alt={
                  fotoProfil ===
                  "https://minio.nutech-integrasi.com/take-home-test/null"
                    ? "/assets/Profile Photo.png"
                    : fotoProfil
                }
              />
              <div className="absolute size-[30px] top-28 left-28 flex justify-center items-center inset-0 rounded-full bg-white border-2 p-1 border-black">
                <MdModeEdit className="text-lg" />
              </div>
            </div>
            <p className="text-xl min-[400px]:text-3xl font-bold">
              {namaDepan} {namaBelakang}
            </p>
          </div>
          {/* INPUT EMAIL */}
          <label>Email</label>
          <div className="relative w-full flex border-2 border-gray-400 rounded-md">
            <input
              type="text"
              className="w-full p-2 ps-8 bg-white rounded-sm text-md"
              value={email}
              disabled
              required
            />
            <MdAlternateEmail className="absolute inset-0 my-auto left-2 text-gray-400" />
          </div>
          {/* INPUT NAMA DEPAN */}
          <label>Nama Depan</label>
          <div className="relative w-full flex border-2 border-gray-400 rounded-md">
            <input
              type="text"
              className="w-full p-2 ps-8 bg-white rounded-sm text-md"
              value={namaDepan}
              disabled
              required
            />
            <FaRegUser className="absolute inset-0 my-auto left-2 text-gray-400" />
          </div>
          {/* INPUT NAMA BELAKANG */}
          <label>Nama Belakang</label>
          <div className="relative w-full flex border-2 border-gray-400 rounded-md">
            <input
              type="text"
              className="w-full p-2 ps-8 bg-white rounded-sm text-md"
              value={namaBelakang}
              disabled
              required
            />
            <FaRegUser className="absolute inset-0 my-auto left-2 text-gray-400" />
          </div>
          {/* TOMBOL EDIT PROFIL */}
          <Link
            to={"/edit-profile"}
            className="w-full font-bold bg-white text-red-500 border-2 border-red-500 text-md p-2 rounded-md mt-4 text-center"
          >
            Edit Profil
          </Link>
          {/* TOMBOL LOG OUT */}
          <button
            type="button"
            onClick={logout}
            className="w-full font-bold bg-red-500 text-white text-md p-2 rounded-md mt-4 cursor-pointer"
          >
            Logout
          </button>
        </form>
      </div>
    </>
  );
};

export default AkunPage;
