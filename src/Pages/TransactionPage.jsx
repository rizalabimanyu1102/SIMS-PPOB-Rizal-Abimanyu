import { useEffect, useState } from "react";
import { ItemsTransaksi } from "../Component/ItemsTransaksi";
import { MenuProfilSaldo } from "../Component/MenuProfilSaldo";
import axios from "axios";

const TransactionPage = () => {
  const [dataTransaction, setDataTransaction] = useState([]);
  let [limit, setLimit] = useState(5);

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "";
    const date = new Date(tanggal);

    const tanggalStr = date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    });

    const jamStr = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    });

    return `${tanggalStr} ${jamStr} WIB`;
  };

  const transactionHistoryResponse = async () => {
    try {
      const res = await axios.get(
        `https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=${0}&limit=${limit}`,
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

  const incrementLimit = (e) => {
    e.preventDefault();
    setLimit(limit + 5);
  };

  useEffect(() => {
    const transactionHistoryPromise = async () => {
      const res = await transactionHistoryResponse();
      setDataTransaction(res?.data?.records);
    };
    transactionHistoryPromise();
  }, [dataTransaction, limit]);

  return (
    <>
      {/* TRANSACTION PAGE */}
      <div className="flex flex-col size-[100%] bg-white font-mono gap-15 z-40 pt-18 pb-15">
        {/* MENU PROFIL DAN SALDO*/}
        <MenuProfilSaldo />
        {/* LIST TRANSACTION*/}
        <div className="flex flex-col lg:flex-row px-5 sm:px-10 md:px-15 lg:px-20 justify-between gap-4 lg:gap-7">
          {/* INPUT & BUTTON SALDO */}
          <div className="flex flex-col gap-3 w-full py-2">
            <div className="flex flex-col gap-6">
              <p className="text-xl min-[350px]:text-2xl font-bold">
                Semua Transaksi
              </p>
              <div className="flex flex-col items-center gap-5">
                {dataTransaction.length !== 0 ? (
                  dataTransaction.map((item, index) => (
                    <ItemsTransaksi
                      key={item.invoice_number + "" + index}
                      index={item.invoice_number + "" + index}
                      total_amount={item.total_amount}
                      description={item.description}
                      created_on={formatTanggal(item.created_on)}
                      symbol={item.description === "Top Up Balance" ? "+" : "-"}
                      color={
                        item.description === "Top Up Balance"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    />
                  ))
                ) : (
                  <p className="p-4">Belum ada transaksi</p>
                )}
              </div>
              {dataTransaction?.length % 5 ? (
                <button
                  onClick={() => setLimit(5)}
                  className=" items-center text-red-500 cursor-pointer"
                >
                  Less More
                </button>
              ) : (
                <button
                  onClick={incrementLimit}
                  className=" items-center text-red-500 cursor-pointer"
                >
                  Show More
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionPage;
