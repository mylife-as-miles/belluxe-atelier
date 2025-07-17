import React from 'react';
import { useRouter } from 'next/router';
import AdminNav from '@/components/admin/AdminNav';

const AdminLayout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="admin-layout">
      <AdminNav />
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;