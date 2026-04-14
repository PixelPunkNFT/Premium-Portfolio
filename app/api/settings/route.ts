import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/mongodb';
import LandingSettings from '@/models/LandingSettings';

export async function GET() {
  try {
    await dbConnect();
    let settings = await LandingSettings.findOne();
    
    if (!settings) {
      // Create default settings if none exist
      settings = await LandingSettings.create({
        brandName: 'Premium Portfolio',
        introTitle: 'Welcome to My Premium Showcase',
        introDescription: 'Discover my exclusive collection of digital products and services',
        profileImage: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
      });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    
    let settings = await LandingSettings.findOne();
    
    if (!settings) {
      settings = await LandingSettings.create(body);
    } else {
      settings = await LandingSettings.findByIdAndUpdate(settings._id, body, { new: true });
    }

    // Revalidate landing page to show updated settings
    revalidatePath('/');

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
