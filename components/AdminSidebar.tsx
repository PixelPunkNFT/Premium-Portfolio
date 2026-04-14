'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Package, 
  Settings, 
  LogOut,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import clsx from 'clsx';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: FolderOpen, label: 'Categories', href: '/admin/categories' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button - Mobile Only */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-900 border border-white/10 rounded-lg text-white hover:bg-zinc-800 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay - Mobile Only */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={clsx(
          'fixed lg:static inset-y-0 left-0 z-40',
          'w-64 min-h-screen bg-zinc-900 border-r border-white/10 flex flex-col',
          'transform transition-transform duration-300 ease-in-out',
          'lg:transform-none', // Always visible on desktop
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0' // Hidden on mobile unless open
        )}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Sparkles className="text-gold" size={28} />
            <span className="text-xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              Premium Admin
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeSidebar}
                    className={clsx(
                      'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                      isActive
                        ? 'bg-gradient-to-r from-gold to-gold-light text-black font-semibold'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
