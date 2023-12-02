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
        <DialogTitle>
          {props.name}
          {props.stock}
          {`${props.lastRestock}`}
          {props.salesLastRestock}
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
