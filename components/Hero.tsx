'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroProps {
  brandName: string;
  introTitle: string;
  introDescription: string;
  profileImage: string;
}

export default function Hero({ brandName, introTitle, introDescription, profileImage }: HeroProps) {
  return (
    <motion.div
      className="text-center py-16 md:py-24"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-gold to-gold-light rounded-full blur-xl opacity-40"></div>
        <Image
          src={profileImage}
          alt={brandName}
          fill
          className="rounded-full object-cover border-4 border-gold/30 relative z-10"
          priority
        />
      </div>
      
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-white mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {brandName}
      </motion.h1>
      
      <motion.h2
        className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {introTitle}
      </motion.h2>
      
      <motion.p
        className="text-gray-400 text-lg max-w-2xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {introDescription}
      </motion.p>
      
      <div className="mt-8 h-px w-64 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent"></div>
    </motion.div>
  );
}
