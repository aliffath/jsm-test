"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ProductCard from "../components/Card";
import Button from "../components/Button";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/transactions")
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          Swal.fire({
            icon: "info",
            title: "Belum Ada Transaksi",
            text: "Silahkan melakukan pembelian terlebih dahulu.",
          });
        }
        setTransactions(data.reverse());
      });
  }, []);

  return (
    <>
      <div className="container mx-auto py-10">
        <h1 className="text-xl font-bold mb-4">Riwayat Transaksi</h1>
        <div>{transactions.length === 0 ? <p>Loading transaksi...</p> : transactions.map((item) => <ProductCard key={item.id} transaction={item} type="secondary" />)}</div>
        <div className="my-5">
          <Button label="Kembali ke halaman utama" onClick={() => router.push("/")} className="bg-green-500 w-full" />
        </div>
      </div>
    </>
  );
}
