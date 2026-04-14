import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { products } = await request.json();

    // Update sortOrder for each product
    const updatePromises = products.map((prod: any, index: number) =>
      Product.findByIdAndUpdate(prod._id, { sortOrder: index })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ message: 'Products reordered successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reorder products' }, { status: 500 });
  }
}
