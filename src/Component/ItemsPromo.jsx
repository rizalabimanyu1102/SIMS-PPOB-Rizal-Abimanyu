export const ItemsPromo = ({ src }) => {
  return (
    <div className="w-[290px] md:w-[350px]">
      <img
        src={src}
        className="rounded-2xl w-[290px] md:w-[350px] shadow-md"
        alt={src}
      />
    </div>
  );
};
