import React from 'react';
import { useRouter } from 'next/router';
import AdminNav from '@/components/admin/AdminNav';

const AdminLayout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex">
      <AdminNav />
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;