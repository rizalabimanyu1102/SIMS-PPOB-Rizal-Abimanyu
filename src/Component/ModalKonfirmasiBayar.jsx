export const ModalKonfirmasiBayar = ({
  service,
  price,
  lainnya,
  hideModal,
  setHideModal,
  setHideModal2,
  onConfirm,
}) => {
  const handleModal = (e) => {
    e.preventDefault();
    setHideModal(false);
  };

  const handleModal2 = async (e) => {
    e.preventDefault();
    setHideModal(false);
    setHideModal2(true);
    if (onConfirm) await onConfirm(e);
  };

  return (
    <div
      className={`fixed ${
        hideModal ? "flex" : "hidden"
      } bg-black/50 w-screen h-screen inset-0 justify-center items-center text-white z-1000`}
    >
      <div className=" bg-white flex flex-col items-center gap-5 text-black px-18 py-5 rounded-lg shadow-2xl">
        <img className="size-[50px]" src="/assets/Logo.png" alt="logo" />
        <div className="flex flex-col items-center">
          <p>{service}</p>
          <p className=" text-4xl font-bold">
            Rp{new Intl.NumberFormat("id-ID").format(price)}?
          </p>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <button
            type="submit"
            onClick={handleModal2}
            className=" text-red-500 p-2 cursor-pointer"
          >
            {lainnya}
          </button>
          <button
            type="button"
            onClick={handleModal}
            className=" text-gray-400 p-2 cursor-pointer"
          >
            Batalkan
          </button>
        </div>
      </div>
    </div>
  );
};
