'use client';

import { motion } from 'framer-motion';

interface CategorySectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function CategorySection({ title, description, children }: CategorySectionProps) {
  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
          {title}
        </h2>
        {description && (
          <p className="text-gray-400 max-w-2xl mx-auto">{description}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </motion.section>
  );
}
