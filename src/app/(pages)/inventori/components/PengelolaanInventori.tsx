"use client";

import { useEffect, useState } from "react";
import CardStock from "./CardStock";
interface Product {
  id: number;
  name: string;
  stock: number;
  image: string;
  lastRestock: Date;
  salesLastRestock: number;
}

async function getDataProducts() {
  const res = await fetch("/api/products", {
    method: "GET",
  });

  const data = await res.json();
  return data;
}

const PengelolaanInventori = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getDataProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-[40px]">Inventory Management System</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-[500px]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green"></div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-[60px] mt-10">
          {products.map((product) => {
            return (
              <CardStock
                key={product.id}
                id={product.id}
                name={product.name}
                stock={product.stock}
                lastRestock={product.lastRestock}
                salesLastRestock={product.salesLastRestock}
                image={product.image}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PengelolaanInventori;
