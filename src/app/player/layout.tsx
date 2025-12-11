
'use client';

export default function PlayerAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary/20 flex flex-col">
      {/* The main content area will now take the full screen for login/register */}
      <main className="flex-1 relative w-full max-w-[100vw] overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
