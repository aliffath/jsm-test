"use client";

import Image from "next/image";

const ProductCard = ({ product, onBuy, loadingId, transaction, type }) => {
  if (type === "primary") {
    return (
      <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white">
        <div className="flex justify-center">
          <Image src={product.image} alt={product.name} width={160} height={180} className="w-[160px] h-[180px] object-cover " />
        </div>
        <h4 className="text-lg font-bold mt-2">{product.name}</h4>
        <p>Harga: Rp{product.price.toLocaleString()}</p>
        <p>Stok: {product.stock}</p>

        <button
          onClick={() => onBuy(product)}
          className={`mt-4 py-2 px-4 rounded-lg cursor-pointer w-full ${
            loadingId === product.id ? "bg-yellow-500 cursor-wait" : "bg-blue-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500"
          } text-white font-medium text-sm leading-5 flex justify-center items-center`}>
          {loadingId === product.id ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 000 16v4l-3.5-3.5L12 20v-4a8 8 0 01-8-8z"></path>
              </svg>
              Loading...
            </div>
          ) : product.stock === 0 ? (
            "Habis"
          ) : (
            "Beli"
          )}
        </button>
      </div>
    );
  }

  if (type === "secondary") {
    return (
      <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white my-5">
        <h4 className="text-lg font-bold">{transaction.productName}</h4>
        <p>Harga: Rp{transaction.price.toLocaleString()}</p>
        <p>Dibayar: Rp{transaction.amountPaid.toLocaleString()}</p>
        <p>Kembalian: Rp{transaction.change.toLocaleString()}</p>
        <small className="text-gray-500">{new Date(transaction.date).toLocaleString()}</small>
      </div>
    );
  }
};

export default ProductCard;
