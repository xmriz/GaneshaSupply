import * as React from "react";

import { Button } from "@/components/ui/button";

import { MdInfoOutline } from "react-icons/md";
import { TbSwitchHorizontal } from "react-icons/tb";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DetailStock from "./DetailStock";
import RequestStock from "./RequestStock";
import WaitStock from "./WaitStock";
import { useState,useEffect } from "react";

interface Request {
  id: number;
  timeReq: Date;
  amount: number;
  productId: number;
}

interface productProps {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  lastRestock: Date;
  salesLastRestock: number;
  request: Request | undefined | null;

}

interface Request {
  id: number;
  timeReq: Date;
  amount: number;
  productId: number;
}


export default function CardStock(props: productProps) {
  const restockDate = new Date(props.lastRestock);
  const tahunRestock = restockDate.getFullYear();
  const bulanRestock = restockDate.getMonth() + 1;
  const tanggalRestock = restockDate.getDate();
  const jamRestock = restockDate.getHours();
  const menitRestock =
    (restockDate.getMinutes() < 10 ? "0" : "") + restockDate.getMinutes();

  const jadwalfix = `${tanggalRestock}-${bulanRestock}-${tahunRestock} ${jamRestock}:${menitRestock}`;

  const [request, setRequest] = useState<Request | undefined | null>(props.request);

  useEffect(() => {
    setRequest(props.request);
  }, [props.request]);

  return (
    <div
      className={`w-full shadow-lg rounded-lg p-[30px] ${props.stock <= 0 ? "bg-red-200" : props.stock <= 10 ? "bg-yellow-100" : "bg-white"}`}
      style={{ boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className=" w-full aspect-square ">
        <div
          className=" w-full aspect-square "
          style={{
            backgroundImage: `url(${props.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-darkGreen mt-4">{props.name}</h2>
        <div className="flex items-end w-full justify-between ">
          <div className="pt-5">
            <h4 className="text-darkGreen font-bold text-xl">Stok</h4>
            <p className={`text-green text-lg pt-2 ${
              props.stock <= 0 ? "text-red-600 font-extrabold text-2xl" : props.stock <= 10 ? "text-yellow-500 font-extrabold text-2xl" : "text-green"
            }`}>{props.stock}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <DetailStock
              key={props.id}
              id={props.id}
              name={props.name}
              price={props.price}
              description={props.description}
              stock={props.stock}
              lastRestock={props.lastRestock}
              salesLastRestock={props.salesLastRestock}

            />
            {(request)?
              <WaitStock
              key={props.id}
              productId = {props.id}
              request = {request}
            />:
              <RequestStock
              key={props.id}
              productId = {props.id}
              name={props.name}
              stock={props.stock}
              lastRestock={props.lastRestock}
              salesLastRestock={props.salesLastRestock}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
