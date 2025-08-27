import React from "react";

const Product = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Suplier Management</h1>
      <div className="flex justify-between items-center">
        <input
          type="text "
          placeholder="serch"
          className="border p-1 bg-white rounded px-4"
          // onChange={handdleSearch}
        />
        <button
          className="px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-900"
          //onClick={() => setAddModel(true)}
        >
          Add Suplier
        </button>
      </div>
    </div>
  );
};

export default Product;
