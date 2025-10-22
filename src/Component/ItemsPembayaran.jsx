export const ItemsPembayaran = ({ src, text }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-[130px] justify-center">
        <img
          src={src}
          className="rounded-2xl w-[40px] min-[350px]:w-[60px] shadow-md"
          alt={src}
        />
      </div>
      <p className="text-center text-[9px] min-[400px]:text-sm">{text}</p>
    </div>
  );
};
