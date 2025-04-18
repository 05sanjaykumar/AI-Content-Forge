import { getUserSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/dashboard/client";

export default async function DashboardPage() {
  const user = await getUserSession();
  console.log('dashboard page')
  if (!user) redirect("/api/auth");

  return <DashboardClient user={user} />;
}
