
'use client';

import { PlayerDashboardController } from "@/components/player/dashboard-controller";

export default function PlayerDashboardPage() {
  // This page now only acts as a server-side entry point.
  // All the client-side logic, state, and conditional rendering
  // have been moved into the PlayerDashboardController to prevent hydration errors.
  return (
      <PlayerDashboardController />
  );
}
