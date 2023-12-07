import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prismaSingleton/prismaSingleClient";

interface Params {
  productId: Number;
}

export async function GET(req: NextRequest) {
  try {
    const params = new URLSearchParams(req.nextUrl.search);
    const id = params.get("id");

    if (id) {
      const requests = await prisma.request.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (requests) {
        return NextResponse.json(requests, { status: 200 });
      } else {
        return NextResponse.next();
      }
    }

    const requests = await prisma.request.findMany();

    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.next();
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  //   create request
  const body = await req.json();

  //   validate body?
  if (!body.productId || !body.timeReq || !body.amount) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  try {
    const request = await prisma.request.create({
      data: {
        productId : body.productId,
        timeReq: body.timeReq,
        amount : body.amount,
      },
    });
    return NextResponse.json(
      { message: "request successfully created", request },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const params = new URLSearchParams(req.nextUrl.search);
  const id = params.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Request ID not provided" },
      { status: 400 }
    );
  }

  try {
    const request = await prisma.request.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(
      { message: "Request successfully deleted", request },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Request:", error);
    return NextResponse.json(
      { error: "Failed to delete Request" },
      { status: 500 }
    );
  }
}