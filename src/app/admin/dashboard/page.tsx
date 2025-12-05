'use client';

import { useState, useEffect } from 'react';
import DirectorDashboard from '@/components/admin/dashboards/director-dashboard';
import FinanceDashboard from '@/components/admin/dashboards/finance-dashboard';
import MatchControlDashboard from '@/components/admin/dashboards/match-control-dashboard';
import DefaultDashboard from '@/components/admin/dashboards/default-dashboard';
import { Loader2 } from 'lucide-react';

// Fungsi untuk mendapatkan sesi dari sessionStorage
const getSession = () => {
  if (typeof window === 'undefined') return null;
  const sessionStr = sessionStorage.getItem('admin_session');
  if (!sessionStr) return null;
  try {
    return JSON.parse(sessionStr);
  } catch (e) {
    return null;
  }
};

export default function AdminDashboardRouter() {
  const [session, setSession] = useState(getSession());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Jika session tidak ada saat pertama kali load, coba lagi setelah sedikit jeda
    // untuk memberi waktu layout mengisi sessionStorage.
    if (!session) {
      setTimeout(() => {
        setSession(getSession());
        setIsLoading(false);
      }, 100);
    } else {
        setIsLoading(false);
    }
  }, [session]);
  
  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
    );
  }

  const userRole = session?.role;

  switch (userRole) {
    case 'DIRECTOR':
      return <DirectorDashboard />;
    case 'FINANCE':
        return <FinanceDashboard />;
    case 'MATCH_COORD':
    case 'REFEREE':
        return <MatchControlDashboard />;
    default:
      return <DefaultDashboard />;
  }
}
