import prisma from "../prismaSingleton/prismaSingleClient";

type ProductCreateInput = {
  name: string;
  price: number;
  description: string;
  image: string; // Ensure 'image' property is included
};

// clear data
const clearData = async () => {
  await prisma.product.deleteMany({});
};

const createProduct = async (
  name: string,
  price: number,
  description: string,
  image: string
) => {
  await prisma.product.create({
    data: {
      name,
      price,
      description,
      image,
    } as ProductCreateInput,
  });
};  

const main = async () => {
  await clearData();
  await createProduct("Pen", 3000, "Versatile writing tool with smooth ink flow, perfect for notes or creativity.", "https://images.tokopedia.net/img/cache/700/product-1/2018/5/19/30564857/30564857_afe99dc9-7d3c-4ea6-bd2c-cbce6fd2d9cc_1000_995");
  await createProduct("Pencil", 2000, "Classic instrument for sketches and notes, offering precision and easy erasability.", "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/4/6/4b3298de-97cb-4ad0-8c4c-b228026fde8f.jpg");
  await createProduct("Eraser", 1000, "Handy tool for correcting mistakes, ensuring clean, smudge-free erasure for a pristine finish.", "https://images.tokopedia.net/img/cache/700/product-1/2018/1/18/26194399/26194399_88dce22b-022b-4ff3-93d0-78e645f4784a_800_800.jpg");
  await createProduct("Ruler", 5000, "Essential measuring instrument for accurate lengths, making it a reliable companion for precise tasks.", "https://down-id.img.susercontent.com/file/04fbe8eeb8d07ec61ae816c21b0e0a97");
  await createProduct("Notebook", 10000, "Blank canvas for thoughts, plans, and ideas, providing a portable space for creativity and organization.", "https://e-katalog.lkpp.go.id/katalog/produk/download/gambar/970745443");
  await createProduct("Stapler", 15000, "Efficient device for securely binding papers, streamlining document organization in office or study spaces.", "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//90/MTA-1694241/kenko_stapler-kenko-hd50_full03.jpg");
};

main()
  .then(() => {
    console.log("Seed data complete.");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
