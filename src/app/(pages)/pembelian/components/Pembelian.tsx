"use client";

import { useEffect, useState } from "react";
import CardPembelian from "./CardPembelian";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  quantity: number;
}

async function getDataProducts() {
  const res = await fetch("/api/products", {
    method: "GET",
  });

  const data = await res.json();
  return data;
}

export default function Pembelian() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalHarga, setTotalHarga] = useState<number>(0);

  useEffect(() => {
    getDataProducts()
      .then((data) => {
        const productsWithQuantity = data.map((product: Product) => {
          return { ...product, quantity: 0 };
        });

        setProducts(productsWithQuantity);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleQuantityChange = (productId: number, quantity: number) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, quantity } : product
    );
    setProducts(updatedProducts);

    const newTotalPrice = updatedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotalHarga(newTotalPrice);
  };

  return (
    <>
      <div className="container mb-28">
        <div className="">
          <h1 className="text-darkGreen text-[40px] mb-8">Item Purchase</h1>
        </div>
        <div className="grid grid-cols-2 gap-[30px] ">
          {products.map((product) => {
            return (
              <CardPembelian
                key={product.id}
                title={product.name}
                description={product.description}
                price={product.price}
                stok={product.stock}
                image={product.image}
                onQuantityChange={(quantity) =>
                  handleQuantityChange(product.id, quantity)
                }
              />
            );
          })}
        </div>
      </div>
      <div
        className="fixed flex items-center justify-end bottom-0 h-[75px] left-0 w-full bg-white px-16"
        style={{ boxShadow: "0px -2px 100px 10px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex flex-row-reverse gap-10 items-center justify-center">
          <button className="bg-green text-white px-4 py-2 text-lg rounded-md hover:bg-[#577B56] hover:shadow-lg">
            Purchase
          </button>
          <div className="flex flex-col justify-center">
            <h3 className="text-darkGreen text-[14px] leading-3">
              Total Harga
            </h3>
            <p className="text-green text-[25px] font-bold">
              {totalHarga.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
