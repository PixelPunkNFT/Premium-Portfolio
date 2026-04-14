'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Package, Eye, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const [categoriesRes, productsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/products'),
      ]);

      const categories = await categoriesRes.json();
      const products = await productsRes.json();

      setStats({
        categories: categories.length || 0,
        products: products.length || 0,
      });
    }

    fetchStats();
  }, []);

  const statCards = [
    { icon: FolderOpen, label: 'Categories', value: stats.categories, color: 'from-blue-500 to-cyan-500', href: '/admin/categories' },
    { icon: Package, label: 'Products', value: stats.products, color: 'from-purple-500 to-pink-500', href: '/admin/products' },
    { icon: Eye, label: 'Public Page', value: 'View', color: 'from-green-500 to-emerald-500', href: '/' },
    { icon: TrendingUp, label: 'Performance', value: 'Good', color: 'from-gold to-gold-light', href: '#' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome to your premium admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const isLink = stat.href !== '#';

          const content = (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-premium"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="text-white" size={24} />
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </motion.div>
          );

          return isLink ? (
            <Link key={stat.label} href={stat.href}>
              {content}
            </Link>
          ) : (
            <div key={stat.label}>{content}</div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-premium">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/products" className="block btn-secondary text-center">
              Add New Product
            </Link>
            <Link href="/admin/categories" className="block btn-secondary text-center">
              Add New Category
            </Link>
            <Link href="/admin/settings" className="block btn-secondary text-center">
              Update Settings
            </Link>
          </div>
        </div>

        <div className="card-premium">
          <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-start">
              <span className="text-gold mr-2">1.</span>
              <span>Create categories to organize your products</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-2">2.</span>
              <span>Add products with images and links</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-2">3.</span>
              <span>Customize your landing page in Settings</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-2">4.</span>
              <span>Reorder items with drag and drop</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
