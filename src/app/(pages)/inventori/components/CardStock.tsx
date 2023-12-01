import * as React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { MdInfoOutline } from "react-icons/md";
import { TbSwitchHorizontal } from "react-icons/tb";

export default function CardStock() {
  return (
    <Card className="w-[386px] h-[516px] drop-shadow-md">
      <CardHeader>
        <Image src="/images/image_dummy.jpg" width="326" height="326" alt="Pic" className="w-[326px] h-[326px] object-cover ml-auto mr-auto pt-[8px] "/>
      </CardHeader>
      <CardContent>
        <h2 className="text-3xl font-bold text-darkGreen ">Bolpoin Pen</h2>
        <div className="flex mt-5 gap-[200px]">
            <div >
                <h4 className="text-darkGreen font-bold">Stok</h4>
                <p className="text-green">730</p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Button variant="details"><MdInfoOutline className = "w-[28px] h-[28px]" color='white'/></Button>
              <Button variant="request"><TbSwitchHorizontal className = "w-[28px] h-[28px]" color='white'/></Button>
            </div>
            
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
      </CardFooter>
    </Card>
  )
}
