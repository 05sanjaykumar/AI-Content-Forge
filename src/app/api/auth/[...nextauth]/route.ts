import NextAuth from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
// import { SupabaseClient } from "@supabase/supabase-js";

const handler = NextAuth({
  providers: [],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
