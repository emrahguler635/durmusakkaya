"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import admin dashboard to prevent SSR and build-time execution
const AdminDashboard = dynamic(() => import("./_components/admin-dashboard"), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center"><p>Yükleniyor...</p></div>
});

export default function AdminPage() {
  const router = useRouter();
  
  // Simple client-side check (for static export)
  useEffect(() => {
    if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
      window.location.href = "/durmusakkaya/admin/login/";
      return;
    }
    try {
      const isAuthenticated = sessionStorage.getItem("admin_authenticated");
      if (!isAuthenticated) {
        window.location.href = "/durmusakkaya/admin/login/";
      }
    } catch {
      window.location.href = "/durmusakkaya/admin/login/";
    }
  }, []);

  return <AdminDashboard />;
}
