import React from 'react';
import { DashboardLayout } from './DashboardLayout';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
export default AdminLayout;
