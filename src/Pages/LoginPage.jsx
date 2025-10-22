import { MdAlternateEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { togglePasswordLoginPertama } from "../features/toggleSlice";
import { useState } from "react";
import axios from "axios";
import { ErrorContainer } from "../Component/ErrorContainer";
import { ErrorContainer2 } from "../Component/ErrorContainer2";

const LoginPage = () => {
  const toggle = useSelector(
    (state) => state.toggle.nilaiTogglePasswordLoginPertama
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorText("Input tidak ada boleh yang kosong!");
      setError(true);
      return;
    }

    try {
      const res = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/login",
        {
          email: email,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setError(false);
      localStorage.setItem("token", res.data.data.token);
      setEmail("");
      setPassword("");
      navigate({ to: "/", replace: true });
    } catch (e) {
      setError(true);
      setErrorText(e?.response?.data?.message);
    }
  };

  return (
    <>
      {/* LOGIN PAGE */}
      <div className="flex w-full h-screen bg-white">
        <div
          className={`w-full md:w-[50%] h-full flex flex-col ${
            error ? "justify-between" : "justify-center"
          } items-center`}
        >
          <ErrorContainer2 text={errorText} error={error} />
          {/* INPUT EMAIL, PASSWORD &  TOMBOL MASUK */}
          <div className="flex flex-col items-center w-[400px] gap-8 p-7">
            <div className="flex flex-col items-center w-full gap-4">
              <div className="flex items-center gap-2">
                <img src="assets/Logo.png" alt="logo" />
                <p className=" font-medium text-xl">SIMS PPOB</p>
              </div>
              <p className="text-2xl font-bold text-center">
                Masuk atau buat akun untuk memulai
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
              {/* INPUT PASSWORD */}
              <div
                className={`relative w-full flex border-2 ${
                  error ? "border-red-500" : "border-gray-400"
                } rounded-md`}
              >
                <div className="flex w-full">
                  <input
                    type={toggle}
                    className="w-[90%] p-1 ps-8 bg-white rounded-l-sm rounded-r-none text-md"
                    placeholder="masukkan password anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    className=" bg-white flex w-[10%] rounded-r-sm cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(togglePasswordLoginPertama());
                    }}
                  >
                    {toggle === "password" ? (
                      <IoEyeOutline className=" m-auto" />
                    ) : (
                      <IoEyeOffOutline className=" m-auto" />
                    )}
                  </button>
                </div>
                <CiLock
                  className={`absolute inset-0 my-auto left-2 ${
                    error ? "text-red-500" : "text-gray-400"
                  }`}
                />
              </div>
              {/* TOMBOL MASUK */}
              <button
                type="submit"
                className="w-full font-bold bg-red-500 text-white text-md p-2 rounded-md mt-4 cursor-pointer"
              >
                Masuk
              </button>
              <div className="flex text-sm gap-3">
                <p>belum punya akun? registrasi</p>
                <Link
                  to={"/register"}
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
          alt="illustrasi login"
        />
      </div>
    </>
  );
};

export default LoginPage;
