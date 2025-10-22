import { MdAlternateEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const EditProfilPage = () => {
  const [fotoProfilDefault, setfotoProfilDefault] = useState(
    "https://minio.nutech-integrasi.com/take-home-test/null"
  );
  const [fotoProfil, setFotoProfil] = useState(fotoProfilDefault);
  const [emailDefault, setEmailDefault] = useState("");
  const [email, setEmail] = useState(emailDefault);
  const [namaDepanDefault, setNamaDepanDefault] = useState("");
  const [namaDepan, setNamaDepan] = useState(namaDepanDefault);
  const [namaBelakangDefault, setNamaBelakangDefault] = useState("");
  const [namaBelakang, setNamaBelakang] = useState(namaBelakangDefault);
  const [selectedFile, setSelectedFile] = useState(null);
  const [hide, setHide] = useState(false);
  const fileInputRef = useRef();
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
      setEmailDefault(res?.data?.email);
      setNamaDepanDefault(res?.data?.first_name);
      setNamaBelakangDefault(res?.data?.last_name);
      setFotoProfil(res?.data?.profile_image);
      setfotoProfilDefault(res?.data?.profile_image);
    };

    profilePromise();
  }, []);

  useEffect(() => {
    if (
      email !== emailDefault ||
      namaDepan !== namaDepanDefault ||
      namaBelakang !== namaBelakangDefault ||
      fotoProfil !== fotoProfilDefault
    ) {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [fotoProfil, email, namaDepan, namaBelakang, hide]);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 100 * 1024;
      if (file.size > maxSize) {
        alert("Ukuran Gambar harus maksima 100 KB!");
        e.target.value = "";
        return;
      }

      const previewURL = URL.createObjectURL(file);
      setFotoProfil(previewURL);
      setSelectedFile(file);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        await axios.put(
          "https://take-home-test-api.nutech-integrasi.com/profile/image",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      await axios.put(
        "https://take-home-test-api.nutech-integrasi.com/profile/update",
        {
          first_name: namaDepan,
          last_name: namaBelakang,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate({ to: "/akun" });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {/* EDIT PROFIL PAGE */}
      <div className=" flex justify-center">
        {/* INPUT PROFIL, EMAIL, NAMA DEPAN, NAMA BELAKANG & TOMBOL SIMPAN, TOMBOL BATALKAN */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full md:w-[900px] gap-3 pt-25 pb-5 px-5 min-[400px]:px-10 md:px-30"
        >
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
              <div
                onClick={handleEditClick}
                className="absolute cursor-pointer size-[30px] top-28 left-28 flex justify-center items-center inset-0 rounded-full bg-white border-2 p-1 border-black"
              >
                <MdModeEdit className="text-lg" />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFotoChange}
                className="absolute opacity-0 size-[30px] top-28 left-28 flex justify-center items-center inset-0 rounded-full bg-white border-2 p-1 border-black"
              />
            </div>
            <p className="text-xl min-[400px]:text-3xl font-bold">
              {namaDepanDefault} {namaBelakangDefault}
            </p>
          </div>
          {/* INPUT EMAIL */}
          <label>Email</label>
          <div className="relative w-full flex border-2 border-gray-400 rounded-md">
            <input
              type="email"
              className="w-full p-2 ps-8 bg-white rounded-sm text-md cursor-not-allowed"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setNamaDepan(e.target.value)}
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
              onChange={(e) => setNamaBelakang(e.target.value)}
              required
            />
            <FaRegUser className="absolute inset-0 my-auto left-2 text-gray-400" />
          </div>
          {/* TOMBOL SIMPAN */}
          <button
            type="submit"
            className="w-full font-bold bg-red-500  text-white text-md p-2 rounded-md mt-4 cursor-pointer"
          >
            Simpan
          </button>
          {/* TOMBOL BATALKAN */}
          <Link
            to={"/akun"}
            className={` ${
              hide ? "block" : "hidden"
            } w-full font-bold bg-white text-red-500 border-2 border-red-500 text-md p-2 rounded-md mt-4 cursor-pointer text-center`}
          >
            Batalkan
          </Link>
        </form>
      </div>
    </>
  );
};

export default EditProfilPage;
