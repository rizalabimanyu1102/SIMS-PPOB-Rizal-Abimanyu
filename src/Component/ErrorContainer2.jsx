export const ErrorContainer2 = ({ text, error }) => {
  return (
    <div
      className={`${
        error ? "flex" : "hidden"
      } w-full items-center bg-red-200 justify-between text-xs opacity-0`}
    >
      <p className=" text-red-600 ps-3">{text}</p>
      <button className=" text-red-600 cursor-pointer p-2 px-3" disabled>
        X
      </button>
    </div>
  );
};
