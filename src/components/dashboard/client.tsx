"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function DashboardClient({ user }: { user: any }) {
  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
      <Button onClick={handleLogout} className="mt-4 bg-red-500 text-white">
        Logout
      </Button>
    </div>
  );
}
