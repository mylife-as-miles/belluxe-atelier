import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const AdminLayout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <nav>
          <ul>
            <li>
              <Link href="/admin/products">Manage Products</Link>
            </li>
            <li>
              <Link href="/admin/products/new">Add New Product</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;