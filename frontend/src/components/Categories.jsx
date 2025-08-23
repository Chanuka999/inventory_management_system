import React from "react";

const Categories = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-8">Category Management</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-1/3">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-center text-xl font-bold mb-4">Add Category</h2>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="category name"
                  className="border w-full p-2 rounded-md"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="category description"
                  className="border w-full p-2 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-800"
              >
                Add category
              </button>
            </form>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Categories;
