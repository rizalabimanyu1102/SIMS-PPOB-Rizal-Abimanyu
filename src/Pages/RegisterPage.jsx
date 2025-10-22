import { MdAlternateEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  togglePasswordRegisterPertama,
  togglePasswordRegisterKedua,
} from "../features/toggleSlice";
import axios from "axios";
import { useState } from "react";
import { ErrorContainer2 } from "../Component/ErrorContainer2";
import { ErrorContainer } from "../Component/ErrorContainer";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [errorText, setErrorText] = useState("");
  const toggle = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !email ||
      !namaDepan ||
      !namaBelakang ||
      !password ||
      !konfirmasiPassword
    ) {
      setErrorText("Input tidak ada boleh yang kosong!");
      setError(true);
      return;
    }

    if (konfirmasiPassword !== password) {
      setError2(true);
      return;
    }
    try {
      await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/registration",
        {
          email: email,
          first_name: namaDepan,
          last_name: namaBelakang,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setEmail("");
      setNamaDepan("");
      setNamaBelakang("");
      setPassword("");
      setKonfirmasiPassword("");
      setError(false);
      setError2(false);
      navigate({ to: "/login", replace: true });
    } catch (e) {
      console.log(e);
      setError(true);
      setErrorText(e?.response?.data?.message);
    }
  };

  return (
    <>
      {/* REGISTRASI PAGE */}
      <div className="flex w-full h-screen bg-white">
        <div
          className={`w-full md:w-[50%] h-full flex flex-col ${
            error ? "justify-between" : "justify-center"
          } items-center`}
        >
          <ErrorContainer2 text={errorText} error={error} />
          {/* INPUT NAMA DEPAN, NAMA BELAKANG, EMAIL, PASSWORD, KONFIRMASI PASSWORD & TOMBOL REGISTRASI */}
          <div className="flex flex-col items-center w-[400px] gap-8 p-7">
            <div className="flex flex-col items-center w-full gap-4">
              <div className="flex items-center gap-2">
                <img src="assets/Logo.png" alt="logo" />
                <p className=" font-medium text-xl">SIMS PPOB</p>
              </div>
              <p className="text-2xl font-bold text-center">
                Lengkapi data untuk membuat akun
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-full gap-5"
            >
              {/* INPUT EMAIL */}
              <div className="relative w-full flex border-2 border-gray-400 rounded-md">
                <input
                  type="text"
                  className="w-full p-1 ps-8 bg-white rounded-sm text-md"
                  placeholder="masukkan email anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MdAlternateEmail className="absolute inset-0 my-auto left-2 text-gray-400" />
              </div>
              {/* INPUT NAMA DEPAN */}
              <div className="relative w-full flex border-2 border-gray-400 rounded-md">
                <input
                  type="text"
                  className="w-full p-1 ps-8 bg-white rounded-sm text-md"
                  placeholder="nama depan"
                  value={namaDepan}
                  onChange={(e) => setNamaDepan(e.target.value)}
                  required
                />
                <FaRegUser className="absolute inset-0 my-auto left-2 text-gray-400" />
              </div>
              {/* INPUT NAMA BELAKANG */}
              <div className="relative w-full flex border-2 border-gray-400 rounded-md">
                <input
                  type="text"
                  className="w-full p-1 ps-8 bg-white rounded-sm text-md"
                  placeholder="nama belakang"
                  value={namaBelakang}
                  onChange={(e) => setNamaBelakang(e.target.value)}
                  required
                />
                <FaRegUser className="absolute inset-0 my-auto left-2 text-gray-400" />
              </div>
              {/* INPUT PASSWORD */}
              <div className="relative w-full flex border-2 border-gray-400 rounded-md">
                <div className="flex w-full">
                  <input
                    type={toggle.nilaiTogglePasswordRegisterPertama}
                    name="password"
                    className="w-[90%] p-1 ps-8 bg-white rounded-l-sm rounded-r-none text-md"
                    placeholder="buat password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    className=" bg-white flex w-[10%] rounded-r-sm cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(togglePasswordRegisterPertama());
                    }}
                  >
                    {toggle.nilaiTogglePasswordRegisterPertama ===
                    "password" ? (
                      <IoEyeOutline className=" m-auto" />
                    ) : (
                      <IoEyeOffOutline className=" m-auto" />
                    )}
                  </button>
                </div>
                <CiLock className="absolute inset-0 my-auto left-2 text-gray-400" />
              </div>
              {/* INPUT KONFIRMASI PASSWORD */}
              <div className="flex flex-col w-full gap-2">
                <div className="relative w-full flex flex-col border-2 border-gray-400 rounded-md">
                  <div className="flex w-full">
                    <input
                      type={toggle.nilaiTogglePasswordRegisterKedua}
                      name="konfirmasiPassword"
                      className="w-[90%] p-1 ps-8 bg-white rounded-l-sm rounded-r-none text-md"
                      placeholder="konfirmasi password"
                      value={konfirmasiPassword}
                      onChange={(e) => setKonfirmasiPassword(e.target.value)}
                      required
                    />
                    <button
                      className=" bg-white flex w-[10%] rounded-r-sm cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(togglePasswordRegisterKedua());
                      }}
                    >
                      {toggle.nilaiTogglePasswordRegisterKedua ===
                      "password" ? (
                        <IoEyeOutline className=" m-auto" />
                      ) : (
                        <IoEyeOffOutline className=" m-auto" />
                      )}
                    </button>
                  </div>
                  <CiLock className="absolute inset-0 my-auto left-2 text-gray-400" />
                </div>
                <p
                  className={`${
                    error2 ? "block" : "hidden"
                  } text-xs text-end text-red-500`}
                >
                  Password Tidak sama
                </p>
              </div>
              {/* TOMBOL REGISTRASI */}
              <button
                type="submit"
                className="w-full font-bold bg-red-500 text-white text-md p-2 rounded-md mt-4 cursor-pointer"
              >
                Registrasi
              </button>
              <div className="flex text-sm gap-3">
                <p>sudah punya akun? login</p>
                <Link
                  to={"/login"}
                  className=" text-red-500 font-bold cursor-pointer"
                >
                  di sini
                </Link>
              </div>
            </form>
          </div>
          <ErrorContainer text={errorText} error={error} setError={setError} />
        </div>
        <img
          src="assets/Illustrasi Login.png"
          className="w-0 md:w-[50%] object-cover"
          alt="illustrasi registres"
        />
      </div>
    </>
  );
};

export default RegisterPage;
