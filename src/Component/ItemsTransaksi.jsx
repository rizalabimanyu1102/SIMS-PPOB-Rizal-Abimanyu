import React from "react";

export const ItemsTransaksi = ({
  index,
  total_amount,
  description,
  created_on,
  symbol,
  color,
}) => {
  return (
    <div
      key={index}
      className=" flex justify-between w-full border-2 border-gray-400 rounded-lg py-3 px-3 min-[350px]:px-6 gap-4"
    >
      <div className="flex flex-col gap-2">
        <p
          className={`text-xs min-[350px]:text-md min-[500px]:text-2xl ${color}`}
        >
          {symbol} Rp.{new Intl.NumberFormat("id-ID").format(total_amount)}
        </p>
        <p className="text-[10px] min-[500px]:text-sm text-gray-400">
          {created_on}
        </p>
      </div>
      <div>
        <p className="text-[10px] min-[500px]:text-sm text-end">
          {description}
        </p>
      </div>
    </div>
  );
};
