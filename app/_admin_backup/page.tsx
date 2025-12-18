"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "./_components/admin-dashboard";

export default function AdminPage() {
  const router = useRouter();
  
  // Simple client-side check (for static export)
  useEffect(() => {
    // In production/static build, redirect to login
    // This is a simple workaround for GitHub Pages
    const isAuthenticated = sessionStorage.getItem("admin_authenticated");
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [router]);

  return <AdminDashboard />;
}
