"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (data) setUser(data);
    }
    fetchUser();
  }, []);

  if (!user) {
    return <div className="text-center mt-20 text-xl">Please log in first.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.email}!</h1>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          window.location.href = "/auth";
        }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}
