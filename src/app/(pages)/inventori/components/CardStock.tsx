import * as React from "react";

import { Button } from "@/components/ui/button";

import { MdInfoOutline } from "react-icons/md";
import { TbSwitchHorizontal } from "react-icons/tb";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DetailStock from "./DetailStock";
interface productProps {
  id: number;
  image: string;
  name: string;
  stock: number;
  lastRestock: Date;
  salesLastRestock: number;
}

export default function CardStock(props: productProps) {
  return (
    <div
      className="w-full shadow-lg rounded-lg p-[30px] "
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
            <p className="text-green text-lg pt-2">{props.stock}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <DetailStock
              key={props.id}
              name={props.name}
              stock={props.stock}
              lastRestock={props.lastRestock}
              salesLastRestock={props.salesLastRestock}
            />
            <Button variant="request">
              <TbSwitchHorizontal className="w-[28px] h-[28px]" color="white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
