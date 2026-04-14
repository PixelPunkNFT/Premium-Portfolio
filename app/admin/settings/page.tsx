'use client';

import { useEffect, useState } from 'react';
import { Upload, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    brandName: '',
    introTitle: '',
    introDescription: '',
    profileImage: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setFormData({
        brandName: data.brandName || '',
        introTitle: data.introTitle || '',
        introDescription: data.introDescription || '',
        profileImage: data.profileImage || '',
      });
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();
      setFormData((prev) => ({ ...prev, profileImage: data.url }));
      toast.success('Image uploaded!');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        throw new Error('Failed to save');
      }
      
      const updated = await res.json();
      console.log('Settings saved:', updated);
      toast.success('Settings updated!');
      
      // Reload settings to confirm save
      await fetchSettings();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to update settings');
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Landing Page Settings</h1>
        <p className="text-gray-400">Customize your public landing page</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="card-premium">
          <h2 className="text-2xl font-bold text-white mb-6">Profile Image</h2>
          <div className="space-y-4">
            {formData.profileImage && (
              <div className="flex justify-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gold/30">
                  <Image src={formData.profileImage} alt="Profile" fill className="object-cover" />
                </div>
              </div>
            )}
            <label className="flex items-center justify-center px-4 py-3 bg-black/50 border border-white/10 rounded-lg cursor-pointer hover:border-gold transition-colors">
              {uploading ? (
                <span className="text-gray-400">Uploading...</span>
              ) : (
                <>
                  <Upload size={20} className="text-gray-400 mr-2" />
                  <span className="text-gray-400">Upload New Image</span>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        <div className="card-premium">
          <h2 className="text-2xl font-bold text-white mb-6">Brand Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Brand Name *</label>
              <input
                type="text"
                required
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:border-gold focus:outline-none"
                placeholder="Your Brand Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Intro Title *</label>
              <input
                type="text"
                required
                value={formData.introTitle}
                onChange={(e) => setFormData({ ...formData, introTitle: e.target.value })}
                className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:border-gold focus:outline-none"
                placeholder="Welcome to My Premium Showcase"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Intro Description *</label>
              <textarea
                required
                value={formData.introDescription}
                onChange={(e) => setFormData({ ...formData, introDescription: e.target.value })}
                className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:border-gold focus:outline-none"
                rows={4}
                placeholder="A brief description about you or your brand"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn-premium w-full" disabled={uploading}>
          <Save size={20} className="inline mr-2" />
          Save Settings
        </button>
      </form>
    </div>
  );
}
