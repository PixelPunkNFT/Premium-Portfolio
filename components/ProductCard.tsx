'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  targetUrl: string;
}

export default function ProductCard({ title, description, image, targetUrl }: ProductCardProps) {
  return (
    <motion.a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="card-premium group cursor-pointer block overflow-hidden"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 w-full overflow-hidden rounded-lg mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
          <ExternalLink className="text-gold" size={24} />
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
    </motion.a>
  );
}
