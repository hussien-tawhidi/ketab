import { dbConnect } from "@/lib/db";
import Book from "@/model/Book";
import Order from "@/model/Order";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    await dbConnect();

    const { customer, address, items, paymentMethod } = await req.json();

    // 1️⃣ Basic validation for required fields
    if (
      !customer?.name ||
      !customer?.phone ||
      !address?.province ||
      !address?.city ||
      !address?.plack ||
      !address?.postCode ||
      !address?.fullAddress ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "تمام فیلدها لازم است!" },
        {
          status: 400,
        }
      );
    }
    // 2️⃣ Validate each item against DB
    const validatedItems = [];
    let total = 0;
    let totalDiscount = 0;

    for (const item of items) {
      const { book: bookId, quantity } = item;

      if (!bookId || !quantity || quantity < 1) {
        return NextResponse.json(
          { error: "ایتم نامعتبر است" },
          { status: 400 }
        );
      }

      const book = await Book.findById(bookId);
      if (!book)
        return NextResponse.json(
          { error: `کتاب ${bookId} یافت نشد!` },
          { status: 400 }
        );

      const unitPrice = book.discountPrice || book.price;
      validatedItems.push({
        book: book._id,
        quantity,
        unitPrice,
      });

      total += unitPrice * quantity;
      const discountAmount = book.price - unitPrice; // per unit discoun
      totalDiscount += discountAmount * quantity;
    }

    // 3️⃣ Create order
    const order = await Order.create({
      customer,
      address,
      items: validatedItems,
      total,
      paymentMethod,
      totalDiscount,
    });
    return NextResponse.json(
      { order, message: "orders founded" },
      { status: 201 }
    );
  } catch (error) {
    console.error("🚀 Order API error:", error);
    return NextResponse.json({ message: "حطای سرور" }, { status: 500 });
  }
}

export async function GET(params) {
  await dbConnect();
  try {
    const orders = await Order.find();
    return NextResponse.json(
      { orders, message: "orders founded" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error, message: "error fetching orders" },
      { status: 500 }
    );
  }
}
