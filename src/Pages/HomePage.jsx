import { useEffect, useState } from "react";
import { ItemsPembayaran } from "../Component/ItemsPembayaran";
import { ItemsPromo } from "../Component/ItemsPromo";
import { MenuProfilSaldo } from "../Component/MenuProfilSaldo";
import { Link } from "@tanstack/react-router";
import axios from "axios";

export const HomePage = () => {
  const [banner, setBanner] = useState(null);
  const [services, setServices] = useState(null);

  const bannerResponse = async () => {
    try {
      const res = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/banner",
        { headers: { "Content-Type": "application/json" } }
      );
      return res?.data;
    } catch (e) {
      console.log(e);
    }
  };

  const serviceResponse = async () => {
    try {
      const res = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/services",
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
    const bannerPromise = async () => {
      const res = await bannerResponse();
      setBanner(res?.data);
    };

    const servicesPromise = async () => {
      const res = await serviceResponse();
      setServices(res?.data);
    };

    bannerPromise();
    servicesPromise();
  }, []);

  return (
    <>
      {/* HOME PAGE */}
      <div className="flex flex-col size-[100%] bg-white font-mono gap-15 z-40 pt-18 pb-15">
        {/* MENU PROFIL DAN SALDO*/}
        <MenuProfilSaldo />
        {/*MENU SERVICE*/}
        <div className="grid grid-cols-3 min-[450px]:grid-cols-4 lg:flex mx-5 sm:mx-10 md:mx-15 lg:mx-20 overflow-x-auto scrollbar-hide gap-3 min-[400px]:gap-10 lg:gap-5">
          {services?.map((item, index) => (
            <Link
              to={`/service/${item.service_code}`}
              search={{
                code: item.service_code,
                src: item.service_icon,
                text: item.service_name,
                price: item.service_tariff,
              }}
              key={index}
            >
              <ItemsPembayaran
                key={index}
                src={item.service_icon}
                text={item.service_name}
              />
            </Link>
          ))}
        </div>
        {/*MENU PROMO MENARIK*/}
        <div className="flex flex-col mx-0 gap-5 overflow-hidden">
          <p className="mx-5 sm:mx-10 md:mx-15 lg:mx-20">
            Temukan promo menarik
          </p>
          <div className="flex gap-3 overflow-hidden">
            <div className="flex gap-3 animate-scrollPromo">
              {banner?.map((item, index) => (
                <ItemsPromo key={index} src={item.banner_image} />
              ))}
            </div>
            <div className="flex gap-3 animate-scrollPromo" aria-hidden>
              {banner?.map((item, index) => (
                <ItemsPromo key={index} src={item.banner_image} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
