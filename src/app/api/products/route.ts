import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prismaSingleton/prismaSingleClient";

export async function GET(req: NextRequest) {
  try {
    const params = new URLSearchParams(req.nextUrl.search);
    const id = params.get("id");

    if (id) {
      const product = await prisma.product.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (product) {
        return NextResponse.json(product, {status: 200});
      } else {
        return NextResponse.next();
      }
    }

    const products = await prisma.product.findMany();

    return NextResponse.json(products, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.next();
  } finally {
    await prisma.$disconnect();
  }
}

