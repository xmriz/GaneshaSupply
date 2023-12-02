import { Button } from "@/components/ui/button";

import { TbSwitchHorizontal } from "react-icons/tb";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface productProps {
  name: string;
  stock: number;
  lastRestock: Date;
  salesLastRestock: number;
}

export default function RequestStock(props: productProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="request">
          <TbSwitchHorizontal className="w-[28px] h-[28px]" color="white" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h1 className="text-[20px] font-bold">
          Berapa jumlah item ini yang ingin direstock?
        </h1>
        <div className="flex w-full items-center gap-5">
          <Input type="number" placeholder="Jumlah" className="h-10"/>
          <Button type="submit" size= "sm" className="h-10">Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
