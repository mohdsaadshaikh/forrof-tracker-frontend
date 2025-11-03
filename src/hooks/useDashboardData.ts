import { useQuery } from "@tanstack/react-query";

export interface DashboardFilters {
  timeRange: string;
  department: string;
  project: string;
  employee: string;
}

interface DashboardData {
  stats: {
    activeEmployees: number;
    inactiveEmployees: number;
    laidOffEmployees: number;
    totalHoursLogged: number;
    checkInToday: number;
    checkOutToday: number;
    lateCheckIn: number;
    onLeave: number;
  };
  weeklyHours: Array<{ week: string; hours: number; percentage: string }>;
  projectHours: Array<{ week: string; estimated: number; logged: number }>;
  lateArrivals: Array<{ name: string; value: number; color: string }>;
}

const generateDashboardData = (filters: DashboardFilters) => {
  // Base multipliers based on filters
  const timeMultiplier =
    filters.timeRange === "today"
      ? 0.3
      : filters.timeRange === "week"
      ? 0.7
      : filters.timeRange === "month"
      ? 1
      : 1;

  const deptMultiplier =
    filters.department === "it"
      ? 1.2
      : filters.department === "marketing"
      ? 0.9
      : filters.department === "sales"
      ? 1.1
      : 1;

  return {
    stats: {
      activeEmployees: Math.floor(452 * deptMultiplier),
      inactiveEmployees: Math.floor(30 * deptMultiplier),
      laidOffEmployees: Math.floor(30 * deptMultiplier),
      totalHoursLogged: Math.floor(360 * timeMultiplier),
      checkInToday: Math.floor(360 * timeMultiplier),
      checkOutToday: Math.floor(62 * timeMultiplier),
      lateCheckIn: Math.floor(6 * timeMultiplier),
      onLeave: Math.floor(42 * timeMultiplier),
    },
    weeklyHours: [
      {
        week: "Week1",
        hours: 65 * timeMultiplier,
        percentage: `${(65 * timeMultiplier).toFixed(1)}%`,
      },
      {
        week: "Week2",
        hours: 45 * timeMultiplier,
        percentage: `${(45 * timeMultiplier).toFixed(1)}%`,
      },
      {
        week: "Week3",
        hours: 86.6 * timeMultiplier,
        percentage: `${(86.6 * timeMultiplier).toFixed(1)}%`,
      },
      {
        week: "Week4",
        hours: 55 * timeMultiplier,
        percentage: `${(55 * timeMultiplier).toFixed(1)}%`,
      },
      {
        week: "Week5",
        hours: 42 * timeMultiplier,
        percentage: `${(42 * timeMultiplier).toFixed(1)}%`,
      },
    ],
    projectHours: [
      {
        week: "week 1",
        estimated: 400 * timeMultiplier,
        logged: 240 * timeMultiplier,
      },
      {
        week: "week 2",
        estimated: 300 * timeMultiplier,
        logged: 380 * timeMultiplier,
      },
      {
        week: "week 3",
        estimated: 200 * timeMultiplier,
        logged: 290 * timeMultiplier,
      },
      {
        week: "week 4",
        estimated: 278 * timeMultiplier,
        logged: 390 * timeMultiplier,
      },
      {
        week: "week 5",
        estimated: 189 * timeMultiplier,
        logged: 480 * timeMultiplier,
      },
      {
        week: "week 6",
        estimated: 239 * timeMultiplier,
        logged: 380 * timeMultiplier,
      },
      {
        week: "week 7",
        estimated: 349 * timeMultiplier,
        logged: 430 * timeMultiplier,
      },
      {
        week: "week 8",
        estimated: 200 * timeMultiplier,
        logged: 350 * timeMultiplier,
      },
      {
        week: "week 9",
        estimated: 278 * timeMultiplier,
        logged: 410 * timeMultiplier,
      },
      {
        week: "week 10",
        estimated: 189 * timeMultiplier,
        logged: 520 * timeMultiplier,
      },
      {
        week: "week 11",
        estimated: 239 * timeMultiplier,
        logged: 390 * timeMultiplier,
      },
      {
        week: "week 12",
        estimated: 349 * timeMultiplier,
        logged: 450 * timeMultiplier,
      },
    ],
    lateArrivals: [
      {
        name: "On Time",
        value: Math.floor(45 * timeMultiplier),
        color: "#1e40af",
      },
      {
        name: "Late Arrival",
        value: Math.floor(20 * timeMultiplier),
        color: "#60a5fa",
      },
      {
        name: "On Leave",
        value: Math.floor(10 * timeMultiplier),
        color: "#93c5fd",
      },
    ],
  };
};

export const useDashboardData = (filters: DashboardFilters) => {
  return useQuery<DashboardData>({
    queryKey: ["dashboard-data", filters],
    queryFn: async () => {
      // Simulate API delay
      return new Promise<DashboardData>((resolve) => {
        setTimeout(() => {
          resolve(generateDashboardData(filters));
        }, 300);
      });
    },
  });
};
