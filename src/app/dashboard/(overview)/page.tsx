import {
  getUser,
  getUserMemberships,
  getUserCheckins,
} from "@/lib/supabase/data";
import { Membership, User } from "@/types";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientInfo from "@/components/dashboard/client-info";
import AttendanceTracker from "@/components/dashboard/attendance-tracker";
import MembershipHistory from "@/components/dashboard/membership-history";
import { Attendance } from "@/types";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";

async function MemberDashboard() {
  const user: User = await getUser();
  const memberships: Membership[] =
    (await getUserMemberships(user.email)) || [];
  const attendanceData: Attendance[] = await getUserCheckins(
    memberships.map((m) => m.id)
  );

  const isActive = () => {
    if (memberships.length === 0) return false;
    const currentDate = new Date();
    const endDate = new Date(memberships[0].end_date);
    // Convert dates to YYYY-MM-DD format
    const today = currentDate.toISOString().split("T")[0];
    const endDateString = endDate.toISOString().split("T")[0];
    return endDateString >= today;
  };

  return (
    <main className="space-y-6">
      <Card className="p-6">
        <ClientInfo client={user} isActive={isActive()} />
      </Card>

      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="attendance">Asistencias</TabsTrigger>
          <TabsTrigger value="memberships">Membresías</TabsTrigger>
        </TabsList>
        <TabsContent value="attendance" className="mt-4">
          <Card className="p-6">
            <AttendanceTracker attendanceData={attendanceData} />
          </Card>
        </TabsContent>
        <TabsContent value="memberships" className="mt-4">
          <Card className="p-6">
            <MembershipHistory memberships={memberships} />
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MemberDashboard />
    </Suspense>
  );
}
