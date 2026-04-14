import mongoose, { Schema, Model } from 'mongoose';

export interface ILandingSettings {
  _id: string;
  brandName: string;
  introTitle: string;
  introDescription: string;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
}

const LandingSettingsSchema = new Schema<ILandingSettings>(
  {
    brandName: {
      type: String,
      required: true,
      default: 'Premium Portfolio',
    },
    introTitle: {
      type: String,
      required: true,
      default: 'Welcome to My Premium Showcase',
    },
    introDescription: {
      type: String,
      required: true,
      default: 'Discover my exclusive collection of digital products and services',
    },
    profileImage: {
      type: String,
      default: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    },
  },
  {
    timestamps: true,
  }
);

const LandingSettings: Model<ILandingSettings> =
  mongoose.models.LandingSettings || mongoose.model<ILandingSettings>('LandingSettings', LandingSettingsSchema);

export default LandingSettings;
