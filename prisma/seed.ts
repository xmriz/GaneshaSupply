import prisma from "../prismaSingleton/prismaSingleClient";

// clear data
const clearData = async () => {
  await prisma.product.deleteMany({});
};

const createProduct = async (
  name: string,
  price: number,
  description: string
) => {
  await prisma.product.create({
    data: {
      name,
      price,
      description,
    },
  });
};

const main = async () => {
  await clearData();
  await createProduct("Pen", 3000, "This is a pen, you can write with it.");
  await createProduct("Pencil", 1000, "This is a pencil, you can draw with it.");
  await createProduct("Eraser", 500, "This is an eraser, you can erase with it.");
  await createProduct("Notebook", 2000, "This is a notebook, you can write in it.");
  await createProduct("Book", 5000, "This is a book, you can read it.");  
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