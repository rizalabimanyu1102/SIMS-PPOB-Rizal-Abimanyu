import { MdMoney } from "react-icons/md";
import { MenuProfilSaldo } from "../Component/MenuProfilSaldo";
import { useEffect, useState } from "react";
import { useParams, useSearch } from "@tanstack/react-router";
import axios from "axios";
import { ModalKonfirmasiBayar } from "../Component/ModalKonfirmasiBayar";
import { ModalBerhasilBayar } from "../Component/ModalBerhasilBayar";
import { ModalGagalBayar } from "../Component/ModalGagalBayar";

const ServicePage = () => {
  const { id } = useParams({ from: "/app-layout/service/$id" });
  const search = useSearch({ from: "/app-layout/service/$id" });
  const [hideModal, setHideModal] = useState(false);
  const [hideModal2, setHideModal2] = useState(false);

  const handleModal = (e) => {
    e.preventDefault();
    setHideModal(true);
  };

  const { code, src, text, price } = search || {};

  useEffect(() => {}, [id]);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const formatted = new Intl.NumberFormat("id-ID").format(value);
    setNominal(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/transaction",
        {
          service_code: code,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {/* TOP UP PAGE */}
      <div className="flex flex-col size-[100%] bg-white font-mono gap-10 z-40 pt-18 pb-15">
        {/* MENU PROFIL DAN SALDO*/}
        <MenuProfilSaldo />
        {/* INPUT & BUTTON SALDO & LIST BUTTON NOMINAL */}
        <div className="flex flex-col lg:flex-row px-5 sm:px-10 md:px-15 lg:px-20 justify-between gap-4 lg:gap-7">
          {/* INPUT & BUTTON SALDO */}
          <div className="flex flex-col gap-3 w-full py-2">
            <p>Pembayaran</p>
            <div className="flex items-center gap-2 min-[500px]:gap-4">
              <img className="size-[40px]" src={src} alt={text} />
              <p className="text-sm min-[350px]:text-lg font-bold">
                {text} PraBayar
              </p>
            </div>
            <div className="flex w-full mt-3 lg:mt-5">
              <form onSubmit={handleSubmit} className="flex flex-col w-full">
                <div className="relative w-full flex border-2 border-gray-400 rounded-md">
                  <input
                    type="text"
                    className="w-full p-1 ps-8 bg-white rounded-sm text-md"
                    placeholder="masukkan nominal Top Up"
                    value={new Intl.NumberFormat("id-ID").format(price)}
                    onChange={handleChange}
                    disabled
                    required
                  />
                  <MdMoney className="absolute inset-0 my-auto left-2 text-gray-400" />
                </div>
                <button
                  type="button"
                  onClick={handleModal}
                  className="w-full font-bold bg-red-500 text-white text-md p-2 rounded-md mt-4 cursor-pointer"
                >
                  Bayar
                </button>
                <ModalKonfirmasiBayar
                  service={`Beli ${text.toLowerCase()} prabayar senilai`}
                  price={price}
                  lainnya={"Ya, lanjutkan Bayar"}
                  hideModal={hideModal}
                  setHideModal={setHideModal}
                  setHideModal2={setHideModal2}
                  onConfirm={handleSubmit}
                />
                <ModalBerhasilBayar
                  service={`Pembayaran ${text.toLowerCase()} prabayar sebesar`}
                  price={price}
                  hideModal2={hideModal2}
                  setHideModal2={setHideModal2}
                />
                <ModalGagalBayar
                  service={`Pembayaran ${text.toLowerCase()} prabayar sebesar`}
                  price={price}
                  hideModal2={hideModal2}
                  setHideModal2={setHideModal2}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicePage;
