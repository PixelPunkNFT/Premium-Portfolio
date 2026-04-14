import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminSidebar from '@/components/AdminSidebar';
import { Providers } from '@/app/providers';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // If no session, show login page without sidebar
  if (!session) {
    return <Providers>{children}</Providers>;
  }

  return (
    <Providers>
      <div className="flex min-h-screen bg-black">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          {/* Add padding on mobile to prevent content hiding behind hamburger button */}
          <div className="lg:p-0 pt-16 lg:pt-0">
            {children}
          </div>
        </div>
      </div>
    </Providers>
  );
}
