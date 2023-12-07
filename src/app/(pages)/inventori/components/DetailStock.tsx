import * as React from "react";

import { Button } from "@/components/ui/button";

import { MdInfoOutline } from "react-icons/md";
import { TbSwitchHorizontal } from "react-icons/tb";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface productProps {
  name: string;
  stock: number;
  lastRestock: Date;
  salesLastRestock: number;
}

export default function DetailStock(props: productProps) {
  const restockDate = new Date(props.lastRestock);
  const tahunRestock = restockDate.getFullYear();
  const bulanRestock = restockDate.getMonth() + 1;
  const tanggalRestock = restockDate.getDate();
  const jamRestock = restockDate.getHours();
  const menitRestock =
    (restockDate.getMinutes() < 10 ? "0" : "") + restockDate.getMinutes();

  const jadwalfix = `${tanggalRestock}-${bulanRestock}-${tahunRestock} ${jamRestock}:${menitRestock}`;

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="details">
          <MdInfoOutline
            className={`w-[28px] h-[28px] ${props.lastRestock} ${props.salesLastRestock}`}
            color="white"
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h1 className="text-[30px] font-bold">{props.name}</h1>
        <hr></hr>
        <h2 className="text-darkGreen font-bold">Stok</h2>
        <h3>{props.stock}</h3>
        <h2 className="text-darkgreen font-bold">Last Restocked</h2>
        <h3>{jadwalfix}</h3>
        <h2 className="text-darkGreen font-bold">Sales(since last restock)</h2>
        <h3>{props.salesLastRestock}</h3>
      </DialogContent>
    </Dialog>
  );
}
