import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { Calendar, MoveDownLeft, MoveUpRight } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const weeklyHoursData = [
  { Days: "Mon", hours: 40 },
  { Days: "Tue", hours: 25 },
  { Days: "Wed", hours: 42 },
  { Days: "Thu", hours: 78 },
  { Days: "Fri", hours: 45 },
  { Days: "Sat", hours: 10 },
];

export default function EmployeeDashboard() {
  // const { data: session } = useSession();
  // const userName = session?.user?.name || "Employee";

  const { data, isLoading } = useAnnouncements();
  const announcements = data?.announcements || [];

  return (
    <div className="space-y-6">
      {/* <Card>
        <CardContent>
          <div className="flex gap-4">
            <div>
              <div className="p-8 bg-slate-100 rounded-full w-fit">
                <UsersRound className="h-10 w-10 text-blue-900" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{userName}</h1>
              <p className="text-muted-foreground text-base">
                Full Stack Developer
              </p>
              <button className="flex items-center gap-2 w-fit border rounded-xl px-3 py-1 text-sm font-medium text-slate-400 border-slate-400">
                Edit <Pencil className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Check-in */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <p className="text-3xl text-indigo-900 font-semibold">9:30</p>
                <p className="text-indigo-900 font-medium">CheckIn Today</p>
                <p className="flex items-center gap-1 text-sm text-slate-400">
                  <span className="p-1 bg-red-200 rounded-full">
                    <MoveDownLeft className="h-3 w-3 text-red-600" />
                  </span>
                  30 Minutes Late
                </p>
              </div>
              <div className="p-2 bg-indigo-100 rounded-full">
                <Calendar className="h-5 w-5 text-indigo-900" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Check-out */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <p className="text-3xl text-indigo-900 font-semibold">5:00</p>
                <p className="text-indigo-900 font-medium w-fit whitespace-nowrap">
                  CheckOut Today
                </p>
                <p className="flex items-center gap-1 text-sm text-slate-400">
                  <span className="p-1 bg-green-200 rounded-full">
                    <MoveUpRight className="h-3 w-3 text-green-600" />
                  </span>
                  On Time
                </p>
              </div>
              <div className="p-2 bg-indigo-100 rounded-full">
                <Calendar className="h-5 w-5 text-indigo-900" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Late Checks */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <p className="text-3xl text-indigo-900 font-semibold">2</p>
                <p className="text-indigo-900 font-medium">Late Checks</p>
                <p className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="p-1 bg-red-200 rounded-full">
                    <MoveDownLeft className="h-3 w-3 text-red-600" />
                  </span>
                  Decline
                </p>
              </div>
              <div className="p-2 bg-indigo-100 rounded-full">
                <Calendar className="h-5 w-5 text-indigo-900" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Fine */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <p className="text-3xl text-indigo-900 font-semibold">$20</p>
                <p className="text-indigo-900 font-medium">Weekly Fine</p>
                <p className="flex items-center gap-1 text-sm text-slate-400">
                  <span className="p-1 bg-red-200 rounded-full">
                    <MoveDownLeft className="h-3 w-3 text-red-600" />
                  </span>
                  Decline
                </p>
              </div>
              <div className="p-2 bg-indigo-100 rounded-full">
                <Calendar className="h-5 w-5 text-indigo-900" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaves Pending */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <p className="text-3xl text-indigo-900 font-semibold">02</p>
                <p className="text-indigo-900 font-medium">Leaves Pending</p>
                <p className="flex items-center gap-1 text-sm text-slate-400">
                  <span className="p-1 bg-red-200 rounded-full">
                    <MoveDownLeft className="h-3 w-3 text-red-600" />
                  </span>
                  Decline
                </p>
              </div>
              <div className="p-2 bg-indigo-100 rounded-full">
                <Calendar className="h-5 w-5 text-indigo-900" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section: Weekly Hours + Announcements */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Weekly Hours Chart */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Weekly Hours Logged
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[250px] w-full p-4">
              <ChartContainer
                config={{
                  hours: { label: "Days", color: "hsl(var(--primary))" },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyHoursData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="Days" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="hours" fill="#01339a" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Announcements */}
        <div className="flex-1">
          <Card className="min-h-[356px]">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-medium">
                  Announcements
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Loading announcements...</p>
              ) : announcements.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No announcements yet.
                </p>
              ) : (
                <Accordion type="single" collapsible className="space-y-2">
                  {announcements.map((announcement) => (
                    <AccordionItem
                      key={announcement.id}
                      value={announcement.id}
                      className="bg-gray-100 rounded-lg"
                    >
                      <AccordionTrigger className="px-4 py-3 text-left font-medium">
                        {announcement.title}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3 bg-gray-100 rounded-b-lg">
                        {announcement.description ||
                          "No description available."}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
