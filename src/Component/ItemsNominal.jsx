export const ItemsNominal = ({ nominal, onSelectNominal }) => {
  return (
    <button
      type="button"
      onClick={() => onSelectNominal(nominal)}
      className="text-xs min-[350px]:text-md p-2 rounded-md border-2 bg-white border-gray-400 cursor-pointer hover:border-red-500 transition"
    >
      Rp{new Intl.NumberFormat("id-ID").format(nominal)}
    </button>
  );
};
