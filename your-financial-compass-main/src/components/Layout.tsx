import { LayoutDashboard, PieChart, Brain, BarChart3, Target, Settings, Search, Bell, RotateCcw } from "lucide-react";
import { useUserProfile } from "@/context/UserProfile";

export type Tab = "dashboard" | "spending" | "advisor" | "forecast" | "goals" | "settings";

const items: { id: Tab; icon: any; label: string }[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "spending", icon: PieChart, label: "Spending" },
  { id: "advisor", icon: Brain, label: "AI Advisor" },
  { id: "forecast", icon: BarChart3, label: "Forecast" },
  { id: "goals", icon: Target, label: "Goals" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export const Sidebar = ({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) => (
  <aside className="fixed left-0 top-0 z-40 flex h-screen w-20 flex-col items-center gap-2 border-r border-border/60 bg-sidebar/80 py-6 backdrop-blur-xl">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[12px] bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <span className="font-display text-lg font-bold text-white">F</span>
    </div>
    {items.map(({ id, icon: Icon, label }) => (
      <button
        key={id}
        title={label}
        onClick={() => onChange(id)}
        className={`nav-icon ${active === id ? "nav-icon-active" : ""}`}
        aria-label={label}
      >
        <Icon className="h-6 w-6" />
      </button>
    ))}
  </aside>
);

export const TopBar = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const { profile, reset } = useUserProfile();
  const initials = (profile?.name || "You")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <header className="mb-10 md:mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 md:gap-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
        <p className="body-text text-muted-foreground mt-3">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3 md:gap-4 flex-wrap justify-start sm:justify-end">
        <button className="nav-icon" aria-label="Search"><Search className="h-6 w-6" /></button>
        <button className="nav-icon relative" aria-label="Notifications">
          <Bell className="h-6 w-6" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <button onClick={reset} className="nav-icon" aria-label="Restart" title="Edit my profile">
          <RotateCcw className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-3 md:gap-4 rounded-[12px] border border-border/60 bg-card/60 px-4 md:px-5 py-2 md:py-3 backdrop-blur-xl">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 font-display text-sm font-bold text-white flex-shrink-0">
            {initials}
          </div>
          <div className="hidden md:block text-right">
            <div className="body-text font-semibold">{profile?.name || "Guest"}</div>
            <div className="text-xs text-muted-foreground capitalize">{profile?.risk || "—"} risk</div>
          </div>
        </div>
      </div>
    </header>
  );
};
