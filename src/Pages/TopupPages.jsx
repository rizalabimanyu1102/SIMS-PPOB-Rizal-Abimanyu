import { MdMoney } from "react-icons/md";
import { ItemsNominal } from "../Component/ItemsNominal";
import { MenuProfilSaldo } from "../Component/MenuProfilSaldo";
import { useEffect, useState } from "react";
import axios from "axios";
import { ModalKonfirmasiTopup } from "../Component/ModalKonfirmasiTopup";
import { ModalBerhasilTopup } from "../Component/ModalBerhasilTopup";
import { ModalGagalTopup } from "../Component/ModalGagalTopup";

const TopupPages = () => {
  const [nominal, setNominal] = useState("");
  const [active, setActive] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  const [hideModal2, setHideModal2] = useState(false);

  const handleModal = (e) => {
    e.preventDefault();
    setHideModal(true);
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const formatted = new Intl.NumberFormat("id-ID").format(value);
    setNominal(formatted);
  };

  const handleSelectNominal = (value) => {
    const formatted = new Intl.NumberFormat("id-ID").format(value);
    setNominal(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(nominal.replace(/\./g, "")) >= 1000000) {
      return;
    }

    try {
      const res = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/topup",
        {
          top_up_amount: nominal ? nominal.replace(/\./g, "") : "0",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const cleanNominal = nominal ? nominal.replace(/\./g, "") : "0";
    if (Number(cleanNominal) >= 10000) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [nominal, active]);

  return (
    <>
      {/* TOP UP PAGE */}
      <div className="flex flex-col size-[100%] bg-white font-mono gap-10 z-40 pt-18 pb-15">
        {/* MENU PROFIL DAN SALDO*/}
        <MenuProfilSaldo />
        {/* INPUT NOMINAL, BUTTON TOP UP & LIST TOMBOL NOMINAL */}
        <div className="flex flex-col lg:flex-row px-5 sm:px-10 md:px-15 lg:px-20 justify-between gap-4 lg:gap-7">
          {/* INPUT NOMINAL & BUTTON TOP UP */}
          <div className="flex flex-col gap-3 w-full lg:w-[55%] py-2">
            <div>
              <p>Silahkan masukkan</p>
              <p className="text-3xl min-[350px]:text-4xl font-bold">
                Nominal Top Up
              </p>
            </div>
            <div className="flex w-full mt-3 lg:mt-7">
              <form onSubmit={handleSubmit} className="flex flex-col w-full">
                {/* INPUT NOMINAL */}
                <div className="relative w-full flex border-2 border-gray-400 rounded-md">
                  <input
                    type="text"
                    className="w-full p-1 ps-8 bg-white rounded-sm text-md"
                    placeholder="masukkan nominal Top Up"
                    value={nominal}
                    onChange={handleChange}
                    required
                  />
                  <MdMoney className="absolute inset-0 my-auto left-2 text-gray-400" />
                </div>
                {/* BUTTON TOP UP */}
                <button
                  type="button"
                  onClick={handleModal}
                  className={`w-full font-bold cursor-pointer ${
                    active ? "bg-red-500 text-white" : "bg-gray-400 text-white"
                  }  text-md p-2 rounded-md mt-4`}
                >
                  Top Up
                </button>
                <ModalKonfirmasiTopup
                  service={"Anda yakin untuk Top Up sebesar"}
                  nominal={Number(nominal.replace(/\./g, ""))}
                  lainnya={"Ya, Lanjutkan Top Up"}
                  hideModal={hideModal}
                  setHideModal={setHideModal}
                  setHideModal2={setHideModal2}
                  onConfirm={handleSubmit}
                />
                <ModalBerhasilTopup
                  service={"Top Up sebesar"}
                  nominal={Number(nominal.replace(/\./g, ""))}
                  hideModal2={hideModal2}
                  setHideModal2={setHideModal2}
                />
                <ModalGagalTopup
                  service={"Top Up sebesar"}
                  nominal={Number(nominal.replace(/\./g, ""))}
                  hideModal2={hideModal2}
                  setHideModal2={setHideModal2}
                />
              </form>
            </div>
          </div>
          {/* LIST TOMBOL NOMINAL */}
          <div className="flex flex-col gap-3 w-full lg:w-[45%] py-2">
            <div className="hidden lg:block opacity-0">
              <p>Silahkan masukkan</p>
              <p className="text-4xl font-bold">Nominal Top Up</p>
            </div>
            <div className="grid grid-cols-3 w-full lg:mt-7 gap-4">
              {[10000, 20000, 50000, 100000, 250000, 500000].map((val) => (
                <ItemsNominal
                  key={val}
                  nominal={val}
                  onSelectNominal={handleSelectNominal}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopupPages;
