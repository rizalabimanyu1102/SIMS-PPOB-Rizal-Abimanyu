export const ErrorContainer = ({ text, error, setError }) => {
  return (
    <div
      className={`${
        error ? "flex" : "hidden"
      } w-full items-center bg-red-200 justify-between text-xs`}
    >
      <p className=" text-red-600 ps-3">{text}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          setError(false);
        }}
        className="text-red-600 cursor-pointer p-2 px-3"
      >
        X
      </button>
    </div>
  );
};
