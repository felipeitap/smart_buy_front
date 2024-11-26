import React from "react";

const DataTable = ({ data, columns }) => {
  if (data?.length < 1) {
    return (
      <div className="bg-[#ab834b1a] p-5 rounded-lg">
        <h2 className="text-lg font-bold text-center">
          Ainda não existem registros
        </h2>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {columns?.map((col, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 text-left"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {row?.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {cell.value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
