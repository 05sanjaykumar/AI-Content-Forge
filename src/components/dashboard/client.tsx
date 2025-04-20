// src/components/dashboard/client.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export default function DashboardClient({ user }: { user: any }) {
  async function handleLogout() {
    await supabase.auth.signOut();
    // The navigation will be handled by the auth listener in the dashboard page
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">User ID</p>
              <p className="text-lg">{user.id}</p>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="destructive"
              className="mt-4"
            >
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}