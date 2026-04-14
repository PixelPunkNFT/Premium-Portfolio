import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { categories } = await request.json();

    // Update sortOrder for each category
    const updatePromises = categories.map((cat: any, index: number) =>
      Category.findByIdAndUpdate(cat._id, { sortOrder: index })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ message: 'Categories reordered successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reorder categories' }, { status: 500 });
  }
}
