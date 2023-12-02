import Image from "next/image";

interface CardPembelianProps {
  title: string;
  description: string;
  price: number;
  stok: number;
  image: string;
}

export default function CardPembelian(props: CardPembelianProps) {
  return (
    <div className="w-full p-[30px] rounded-lg shadow-lg">
      <div className="flex flex-row gap-[40px]">
        <div
          className="w-[150px] h-[150px] bg-gray rounded-lg"
          style={{
            backgroundImage: `url(${props.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-darkGreen text-[30px]">{props.title}</h1>
          <p className="text-darkGreen text-[20px]">{props.description}</p>
          <p className="text-darkGreen text-[20px]">Rp {props.price}</p>
          <p className="text-darkGreen text-[20px]">Stok: {props.stok}</p>
        </div>
      </div>
    </div>
  );
}
