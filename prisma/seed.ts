import prisma from "../prismaSingleton/prismaSingleClient";

// clear data
const clearData = async () => {
  await prisma.allProducts.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.order.deleteMany({});
};

const createProduct = async (
  name: string,
  price: number,
  description: string
) => {
  const product = await prisma.product.create({
    data: {
      name,
      price,
      description,
    },
  });

  // Create associated AllProducts
  await prisma.allProducts.create({
    data: {
      productId: product.id,
    },
  });

  return product;
};

const createOrder = async (
  total: number,
  orderlines: { productId: number; quantity: number }[]
) => {
  const order = await prisma.order.create({
    data: {
      timestamp: new Date(),
      total,
      orderlines: {
        create: orderlines.map((line) => ({
          quantity: line.quantity,
          productId: line.productId,
        })),
      },
    },
    include: {
      orderlines: true,
    },
  });

  return order;
};

const main = async () => {
  // Clear existing data
  await clearData();

  // Create sample products
  const product1 = await createProduct("Product 1", 20, "Description 1");
  const product2 = await createProduct("Product 2", 30, "Description 2");

  // Create an order with associated orderlines
  const order = await createOrder(
    // total formula
    product1.price * 2 + product2.price * 1,
    [
      { productId: product1.id, quantity: 2 },
      { productId: product2.id, quantity: 1 },
    ]
  );

  console.log("Seeding data created:", { product1, product2, order });
};

clearData();
main();
