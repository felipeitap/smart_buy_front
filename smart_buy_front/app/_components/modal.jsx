export default function Modal({
  isOpen,
  onClose,
  children,
  closeMessage,
  modalTitle,
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-lg shadow-xl w-96 rounded-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#2f3540] text-white font-bold p-1 pl-4 rounded-t-lg">
          {modalTitle}
        </div>
        <div className="p-6">{children}</div>
        <button onClick={onClose} className="transition duration-300 m-4 self-end">
          {closeMessage}
        </button>
      </div>
    </div>
  );
}
