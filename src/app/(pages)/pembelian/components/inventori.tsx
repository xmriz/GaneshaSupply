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

  useEffect(() => {
    getDataProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="container mx-auto">
        {/* judul */}
        <div className="">
          <h1 className="text-darkGreen text-[40px]">Item Purchase</h1>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {products.map((product) => {
            return (
              <CardPembelian
                key={product.id}
                title={product.name}
                description={product.description}
                price={product.price}
                stok={product.stock}
                image={product.image}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
