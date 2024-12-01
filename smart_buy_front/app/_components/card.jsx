export default function Card({ children, style }) {
  return (
    <div className={`bg-[#ab834b1a] p-5 rounded-lg mb-10 ${style}`}>
      {children}
    </div>
  );
}
