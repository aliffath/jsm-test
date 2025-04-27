"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";
import Button from "./components/Button";
import ProductCard from "./components/Card";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [totalUang, setTotalUang] = useState(0);
  const [loadingId, setLoadingId] = useState(null);
  const [visibleProduct, setVisibleProduct] = useState(5);
  const router = useRouter();

  const pecahanUang = [2000, 5000, 10000, 20000, 50000];

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Gagal fetch produk", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const inputMoney = (nilai) => {
    setTotalUang((prev) => prev + nilai);
  };

  const refund = () => {
    if (totalUang > 0) {
      Swal.fire({
        icon: "info",
        title: "Uang Dikembalikan",
        text: `Rp${totalUang.toLocaleString()}`,
      });
      setTotalUang(0);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Tidak ada uang untuk dikembalikan!",
      });
    }
  };

  const buyProduct = async (produk) => {
    if (produk.stock <= 0) {
      Swal.fire({
        icon: "error",
        title: "Stok habis!",
      });
      return;
    }

    if (totalUang < produk.price) {
      Swal.fire({
        icon: "error",
        title: "Uang tidak cukup!",
      });
      return;
    }

    setLoadingId(produk.id);

    const refundMoney = totalUang - produk.price;

    const transaksiBaru = {
      productId: produk.id,
      productName: produk.name,
      price: produk.price,
      amountPaid: totalUang,
      change: refundMoney,
      date: new Date().toISOString(),
    };

    try {
      await fetch(`http://localhost:3001/products/${produk.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: produk.stock - 1 }),
      });

      await fetch("http://localhost:3001/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaksiBaru),
      });

      Swal.fire({
        icon: "success",
        title: "Pembelian Berhasil!",
        text: `Kembalian Anda: Rp${refundMoney.toLocaleString()}`,
      });

      setTotalUang((prev) => prev - produk.price);
      await fetchProducts();
    } catch (error) {
      console.error("Gagal beli produk", error);
      Swal.fire({
        icon: "error",
        title: "Gagal membeli produk!",
      });
    } finally {
      setLoadingId(null);
    }
  };

  const loadMore = () => {
    setVisibleProduct((prev) => prev + 4);
  };

  return (
    <>
      <div className="relative h-[400px] w-full bg-[url('/image/background.jpg')] bg-no-repeat bg-cover bg-center">
        <div className="absolute inset-0 bg-gray-600/40"></div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <h1 className="text-white text-2xl md:text-4xl font-bold text-center">
            Selamat Datang di <br /> Vending Machine
          </h1>
        </div>
      </div>

      <div className="px-4 lg:px-20 xl:px-40 py-10">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between pb-5">
              <h1 className="text-xl font-semibold leading-5">Produk:</h1>
              <div onClick={() => router.push("/admin")} className="text-slate-600 text-base hover:underline cursor-pointer">
                Lihat Dashboard Admin
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.length === 0 ? (
                <p>Loading produk...</p>
              ) : (
                products.slice(0, visibleProduct).map((item) => <ProductCard key={item.id} product={item} onBuy={buyProduct} loadingId={loadingId} type="primary" />)
              )}
            </div>
            {visibleProduct < products.length && (
              <div className="flex justify-center mt-8">
                <Button label="Load More" onClick={loadMore} className="bg-green-500 w-full" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-semibold leading-6">Masukan Uang Terlebih Dahulu :</h1>
            <div className="my-5 flex flex-wrap gap-4">
              {pecahanUang.map((nominal) => (
                <button key={nominal} onClick={() => inputMoney(nominal)} className="bg-blue-500  text-white text-sm font-medium cursor-pointer py-2 px-4 rounded-lg">
                  Rp{nominal.toLocaleString()}
                </button>
              ))}
            </div>
            <h2 className="text-base md:text-xl mb-4">Total Uang: Rp{totalUang.toLocaleString()}</h2>
            <div className="flex gap-5 justify-between items-end">
              <Button label="Ambil Kembalian" onClick={refund} className="bg-red-500" />
              <div onClick={() => router.push("/history")} className="text-slate-600 text-sm lg:text-base hover:underline cursor-pointer">
                Lihat History Transaksi
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
