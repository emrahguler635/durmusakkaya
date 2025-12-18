"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import admin dashboard to prevent SSR
const AdminDashboard = dynamic(() => import("./_components/admin-dashboard"), {
  ssr: false,
});

export default function AdminPage() {
  const router = useRouter();
  
  // Simple client-side check (for static export)
  useEffect(() => {
    // In production/static build, redirect to login
    // This is a simple workaround for GitHub Pages
    if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
      router.push("/admin/login");
      return;
    }
    try {
      const isAuthenticated = sessionStorage.getItem("admin_authenticated");
      if (!isAuthenticated) {
        router.push("/admin/login");
      }
    } catch {
      router.push("/admin/login");
    }
  }, [router]);

  return <AdminDashboard />;
}
