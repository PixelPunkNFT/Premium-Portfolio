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
  const isLoginPage = true; // This will be handled by middleware

  // If not login page and no session, redirect
  if (!session && !isLoginPage) {
    redirect('/admin/login');
  }

  // If it's the login page, don't show sidebar
  if (!session) {
    return <Providers>{children}</Providers>;
  }

  return (
    <Providers>
      <div className="flex min-h-screen bg-black">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </Providers>
  );
}
