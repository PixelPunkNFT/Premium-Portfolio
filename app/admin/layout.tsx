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
  
  // Debug logging
  console.log('=== ADMIN LAYOUT ===');
  console.log('Session:', session);
  console.log('Session exists:', !!session);
  console.log('User:', session?.user);
  console.log('==================');
  
  const isLoginPage = true; // This will be handled by middleware

  // If not login page and no session, redirect
  if (!session && !isLoginPage) {
    console.log('❌ No session, redirecting to login');
    redirect('/admin/login');
  }

  // If it's the login page, don't show sidebar
  if (!session) {
    console.log('⚠️ No session, showing login page');
    return <Providers>{children}</Providers>;
  }

  console.log('✅ Session valid, showing admin layout');

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
