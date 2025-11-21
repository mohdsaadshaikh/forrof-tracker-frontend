import { useSession } from "@/lib/auth-client";
import {

  Calendar,
 
 
 EllipsisVertical,
  MoveUpRight,
  Pencil ,
  UsersRound,
  MoveDownLeft
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const weeklyHoursData = [
  { Days: "Mon", hours: 40 },
  { Days: "Tue", hours: 25 },
  { Days: "Wed", hours: 42 },
  { Days: "The", hours: 78 },
  { Days: "Fri", hours: 45 },
  { Days: "Sat", hours: 10 },
];


import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
export default function EmployeeDashboard() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Employee";

 
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex gap-4 py-12 bg-white rounded-2xl">
       <div>
  <div className="p-8 bg-slate-100 rounded-full w-fit ml-5">
    <UsersRound className="h-10 w-10 text-blue-900" />
  </div>
</div>
      <div className="flex flex-col gap-2">
  <h1 className="text-3xl font-bold tracking-tight">
    {userName}
  </h1>

  <p className="text-muted-foreground text-base">
    Full Stack Developer
  </p>

  <button
    className="flex items-center gap-2 w-fit border rounded-xl px-3 py-1 text-sm font-medium text-slate-400 border-slate-400
    "
  >
    Edit <Pencil className="h-4 w-4" />
  </button>
</div>
      </div>
      

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      

 
   <div className="  flex justify-between items-center bg-white p-4 rounded-2xl ">
      {/* Left Section */}
      <div className="flex flex-col gap-1">
        <p className="text-3xl  text-indigo-900 font-semibold">9:30</p>
        <p className="text-indigo-900 font-medium">CheckIn Today</p>
       <p className="flex items-center gap-1 text-sm text-slate-400">
  <span className="p-1 bg-red-200 rounded-full">
    <MoveDownLeft className="h-3 w-3 text-red-600" />
  </span>
  30 Minutes Late
</p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end gap-8">
        <div className="p-2 bg-indigo-100 rounded-full">
          <Calendar className="h-5 w-5 text-indigo-900" />
        </div>
        <button className="bg-blue-900 text-white text-sm font-light px-2 py-2  rounded-2xl ">
           Check Details
        </button>
      </div>
    </div>
  
  
   
    
   <div className="flex justify-between items-center bg-white p-4 rounded-2xl  ">
      {/* Left Section */}
      <div className="flex flex-col gap-1 ">
        <p className="text-3xl  text-indigo-900 font-semibold">5:00</p>
        <p className="text-indigo-900 font-medium w-fit whitespace-nowrap">CheckOut Today</p>
       <p className="flex items-center gap-1 text-sm text-slate-400">
  <span className="p-1 bg-green-200 rounded-full">
    <MoveUpRight className="h-3 w-3 text-green-600" />
  </span>
  On Time
</p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end gap-8 ">
        <div className="p-2 bg-indigo-100 rounded-full">
          <Calendar className="h-5 w-5 text-indigo-900" />
        </div>
        <button className="bg-blue-900 text-white text-sm font-light px-2 py-2 rounded-2xl w-fit whitespace-nowrap ">
          Check Details
        </button>
      </div>
    </div>
   




    <div className="flex justify-between items-center  bg-white p-4 rounded-2xl ">
      {/* Left Section */}
      <div className="flex flex-col gap-1">
        <p className="text-3xl  text-indigo-900 font-semibold">2</p>
        <p className="text-indigo-900 font-medium">Late Checks</p>
        <p className="flex items-center gap-2 text-sm text-slate-400">
          <span className="p-1 bg-red-200 rounded-full">
            <MoveDownLeft className="h-3 w-3 text-red-600" />
          </span>
          Decline
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end gap-8 ">
        <div className="p-2 bg-indigo-100 rounded-full">
          <Calendar className="h-5 w-5 text-indigo-900" />
        </div>
        <button className="bg-blue-900 text-white text-sm font-light px-2 py-2  rounded-2xl  w-fit ">
          Check Details
        </button>
      </div>
    </div>
 





       
   <div className="flex justify-between items-center bg-white p-4 rounded-2xl ">
      {/* Left Section */}
      <div className="flex flex-col gap-1">
        <p className="text-3xl  text-indigo-900 font-semibold">$20</p>
        <p className="text-indigo-900 font-medium">Weekly Fine</p>
       <p className="flex items-center gap-1 text-sm text-slate-400">
  <span className="p-1 bg-red-200 rounded-full">
    <MoveDownLeft className="h-3 w-3 text-red-600" />
  </span>
  Decline
</p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end gap-8">
        <div className="p-2 bg-indigo-100 rounded-full">
          <Calendar className="h-5 w-5 text-indigo-900" />
        </div>
        <button className="bg-blue-900 text-white text-sm font-light px-2 py-2  rounded-2xl ">
          Check Details
        </button>
      </div>
    </div>
   



         
   <div className="flex justify-between items-center bg-white p-4 rounded-2xl ">
      {/* Left Section */}
      <div className="flex flex-col gap-1">
        <p className="text-3xl  text-indigo-900 font-semibold">02</p>
        <p className="text-indigo-900 font-medium">Leaves Pending</p>
       <p className="flex items-center gap-1 text-sm text-slate-400">
  <span className="p-1 bg-red-200 rounded-full">
    <MoveDownLeft className="h-3 w-3 text-red-600" />
  </span>
  Decline
</p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end gap-8">
        <div className="p-2 bg-indigo-100 rounded-full">
          <Calendar className="h-5 w-5 text-indigo-900" />
        </div>
        <button className="bg-blue-900 text-white text-sm font-light px-2 py-2  rounded-2xl ">
         Check Details
        </button>
      </div>
    </div>
  
  
      </div>





  <div className="flex flex-col md:flex-row   gap-6">
  {/* Weekly Hours Logged */}
  <div className="flex-1   rounded-lg ">
    
    
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">
            Weekly Hours Logged
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] w-full p-4">
          <ChartContainer
            config={{
              hours: {
                label: "Days",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-full w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyHoursData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="Days" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="hours"
                  // fill="hsl(var(--primary))"
                  fill="#01339a"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
   

  </div>

  {/* Announcements */}
 <div className="flex-1 bg-white p-6 rounded-lg shadow">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold">Announcements</h2>
    <EllipsisVertical className="h-5 w-5 text-gray-500" />
  </div>

  <Accordion type="single" collapsible className="space-y-2">
    <AccordionItem value="item-1" className="bg-gray-100 rounded-lg">
      <AccordionTrigger className="px-4 py-3 rounded-lg ">
        Is it accessible?
      </AccordionTrigger>
      <AccordionContent className="px-4 py-3 bg-gray-100 rounded-b-lg">
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2" className="bg-gray-100 rounded-lg">
      <AccordionTrigger className="px-4 py-3 rounded-lg ">
        Is it accessible?
      </AccordionTrigger>
      <AccordionContent className="px-4 py-3 bg-gray-100 rounded-b-lg">
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-3" className="bg-gray-100 rounded-lg">
      <AccordionTrigger className="px-4 py-3 rounded-lg ">
        Is it accessible?
      </AccordionTrigger>
      <AccordionContent className="px-4 py-3 bg-gray-100 rounded-b-lg">
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-4" className="bg-gray-100 rounded-lg">
      <AccordionTrigger className="px-4 py-3 rounded-lg ">
        Is it accessible?
      </AccordionTrigger>
      <AccordionContent className="px-4 py-3 bg-gray-100 rounded-b-lg">
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>

</div>













    </div>
  );
}



