"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Pencil, Trash2 } from "lucide-react";
import Button from "@/app/components/Button";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const ProductsPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const validationProducts = yup.object().shape({
    name: yup.string().required("Nama produk wajib diisi"),
    price: yup.number().typeError("Harga harus angka").required("Harga produk wajib diisi"),
    stock: yup.number().typeError("Stok harus angka").required("Stok produk wajib diisi"),
    image: yup.string().required("URL gambar wajib diisi"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationProducts),
  });

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onSubmit = async (data) => {
    if (editId) {
      await fetch(`http://localhost:3001/products/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Produk berhasil diperbarui.",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Produk berhasil ditambahkan.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
    setOpen(false);
    setEditId(null);
    reset();
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setValue("name", product.name);
    setValue("price", product.price);
    setValue("stock", product.stock);
    setValue("image", product.image);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Produk yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:3001/products/${id}`, {
          method: "DELETE",
        });
        fetchProducts();
        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Produk telah dihapus.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleAddNew = () => {
    setEditId(null);
    reset();
    setOpen(true);
  };

  return (
    <div className="px-4 lg:px-20 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Produk</h1>

        <Button onClick={handleAddNew} className="bg-blue-600" label="Tambah Produk" />
      </div>

      <div className="overflow-x-auto p-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Gambar</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Nama Produk</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Harga</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Stok</th>
              <th className="text-center px-6 py-3 text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                </td>
                <td className="px-6 py-4 text-gray-800">{product.name}</td>
                <td className="px-6 py-4 text-gray-800">Rp{product.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-800">{product.stock}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => handleEdit(product)} className="flex cursor-pointer items-center gap-1 px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="flex cursor-pointer items-center gap-1 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md">
                      <Trash2 className="w-4 h-4" />
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <Button onClick={() => router.push("/")} className="bg-green-500 w-full my-5" label="Kembali ke halaman utama" />
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[480px] space-y-4 relative">
            <button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
              ✖
            </button>
            <h2 className="text-xl font-bold">{editId ? "Edit Produk" : "Tambah Produk"}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input type="text" placeholder="Nama Produk" {...register("name")} className="w-full border rounded px-3 py-2" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              <div>
                <input type="number" placeholder="Harga Produk" {...register("price")} className="w-full border rounded px-3 py-2" />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
              </div>
              <div>
                <input type="number" placeholder="Stok Produk" {...register("stock")} className="w-full border rounded px-3 py-2" />
                {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
              </div>
              <div>
                <input type="text" placeholder="URL Gambar Produk" {...register("image")} className="w-full border rounded px-3 py-2" />
                {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
              </div>
              <button type="submit" className="w-full py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {editId ? "Update Produk" : "Tambah Produk"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
