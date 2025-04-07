"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Page() {
  useEffect(() => {
    async function check() {
      const { data, error } = await supabase.auth.getSession();
      console.log("Session:", data, "Error:", error);
    }
    check();
  }, []);

  return <div>Hello Supabase Test</div>;
}
