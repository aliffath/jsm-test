<br/> <p align="center"> <a href="https://github.com/aliffath/jsm-test"> </a> <h3 align="center">Vending Machine App</h3> <p align="center"> Buy your favorite products easily with virtual vending machine. <br/> <br/> <a href="https://github.com/aliffath/jsm-test"><strong>Explore the docs »</strong></a> <br/> <br/> . <a href="https://github.com/aliffath/jsm-test/issues">Report Bug</a> . <a href="https://github.com/aliffath/jsm-test/issues">Request Feature</a> </p> </p>

About The Project

<p align="center"> Welcome to the Vending Machine App! This project allows users to view available products, insert money, make purchases, and view transaction history. Admins can manage products easily through the admin panel with full CRUD functionality. </p>

## Built With

This app was built with these technologies:

- Next.js (App Router)
- Tailwind CSS
- React Hook Form
- Yup
- SweetAlert2
- JSON Server (Fake API)

## Prerequisites

Before installation, make sure you have:

- NodeJS installed. (Recommended: v18.x.x or higher)
- Download here: https://nodejs.org/en/download

## json-server installed :

- npm install --save-dev json-server

## Installation

Clone the Repository:

- git clone https://github.com/aliffath/jsm-test.git

## Install Dependencies:

- npm install

## Start JSON Server:

- npm run json-server

## Run the Development Server:

- npm run dev
- Now the app should be running on http://localhost:3000
- And the fake API running on http://localhost:3001

## Usage Guide

- Admin Panel (CRUD Features)
- Klik tombol "Dashboard Admin" yang tersedia di halaman utama.

Di halaman admin:

- Create Product: Klik tombol "Add Product", isi form produk baru.
- Untuk mengisi gambar produk, gunakan path gambar dari folder /public/image, contoh:/image/sprite.jpg
- Edit Product: Klik tombol "Edit" pada produk yang ingin diubah.
- Sama seperti saat create, saat edit gambar produk, gunakan path seperti: /image/sprite.jpg
- Delete Product: Klik tombol "Delete" untuk menghapus produk.

Membeli Produk

- Di halaman Home, sebelum membeli produk, pastikan Anda sudah mengisi uang.
- Klik tombol button yang berada di sebelah kanan halaman.
- Setelah memasukkan nominal uang, Anda bisa langsung klik tombol "Beli" di produk yang diinginkan.
