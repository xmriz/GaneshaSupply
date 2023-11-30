import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createProduct = async (name: string, price: number, description: string) => {
  return await prisma.product.create({
    data: {
      name,
      price,
      description,
    },
  });
};


const main = async () => {
  await createProduct("Pen", 3000, "This is a pen");
  await createProduct("Pencil", 2000, "This is a pencil");
  await createProduct("Eraser", 1000, "This is an eraser");
  await createProduct("Ruler", 5000, "This is a ruler");
  await createProduct("Notebook", 3500, "This is a notebook");
  await createProduct("Calculator", 15000, "This is a calculator");
}

main()