export default function AlertCard({ title, children, onClick }) {
  return (
    <div className="bg-[#8c86814d] p-4 rounded-lg flex flex-col gap-6 w-72">
      <div>
        <h2 className="font-bold">{title}</h2>
      </div>
      <div>{children}</div>
      <div className="self-end">
        <button onClick={onClick}>Ver mais</button>
      </div>
    </div>
  );
}
