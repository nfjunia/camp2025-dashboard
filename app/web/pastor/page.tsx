"use client";
import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  CalendarDays,
  TrendingUp,
  Wallet,
  MapPin,
  UserCheck,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import Header from "@/components/pastor/Header";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FullPageLoader from "@/components/FullPageLoader";
import AppSidebar from "@/components/pastor/app-sidebar";

interface GenderData {
  name: string;
  value: number;
}

interface AgeData {
  ageGroup: string;
  count: number;
}

interface DailyDemographics {
  [day: string]: {
    gender: GenderData[];
    age: AgeData[];
  };
}

interface AttendanceDataItem {
  day: string;
  morning: number;
  afternoon: number;
  evening: number;
}

interface RegionData {
  region: string;
  count: number;
}

interface MaritalStatusData {
  name: string;
  value: number;
}

interface AgeDistribution {
  ageGroup: string;
  count: number;
}

const networkInfo = {
  name: "Kabod Assembly",
  pastor: "Pastor David Jnr",
  location: "Bono Region",
  establishedYear: 2018,
};

const totalPayments = 15500;
const totalRegistered = 180;
const registeredByOthers = 25;
const networkMembers = 450;
const activeMembers = 320;

const attendanceData: AttendanceDataItem[] = [
  { day: "Day 1", morning: 120, afternoon: 115, evening: 135 },
  { day: "Day 2", morning: 135, afternoon: 128, evening: 145 },
  { day: "Day 3", morning: 145, afternoon: 140, evening: 155 },
  { day: "Day 4", morning: 160, afternoon: 150, evening: 165 },
];

const dailyDemographics: DailyDemographics = {
  "Day 1": {
    gender: [
      { name: "Male", value: 180 },
      { name: "Female", value: 190 },
      { name: "Other", value: 8 },
    ],
    age: [
      { ageGroup: "0-12", count: 45 },
      { ageGroup: "13-17", count: 35 },
      { ageGroup: "18-30", count: 120 },
      { ageGroup: "31-50", count: 110 },
      { ageGroup: "51+", count: 60 },
    ],
  },
  "Day 2": {
    gender: [
      { name: "Male", value: 195 },
      { name: "Female", value: 213 },
      { name: "Other", value: 0 },
    ],
    age: [
      { ageGroup: "0-12", count: 50 },
      { ageGroup: "13-17", count: 38 },
      { ageGroup: "18-30", count: 130 },
      { ageGroup: "31-50", count: 120 },
      { ageGroup: "51+", count: 70 },
    ],
  },
  "Day 3": {
    gender: [
      { name: "Male", value: 210 },
      { name: "Female", value: 230 },
      { name: "Other", value: 0 },
    ],
    age: [
      { ageGroup: "0-12", count: 55 },
      { ageGroup: "13-17", count: 42 },
      { ageGroup: "18-30", count: 140 },
      { ageGroup: "31-50", count: 130 },
      { ageGroup: "51+", count: 73 },
    ],
  },
  "Day 4": {
    gender: [
      { name: "Male", value: 230 },
      { name: "Female", value: 245 },
      { name: "Other", value: 0 },
    ],
    age: [
      { ageGroup: "0-12", count: 60 },
      { ageGroup: "13-17", count: 45 },
      { ageGroup: "18-30", count: 150 },
      { ageGroup: "31-50", count: 140 },
      { ageGroup: "51+", count: 80 },
    ],
  },
};

const genderData: GenderData[] = [
  { name: "Male", value: 85 },
  { name: "Female", value: 95 },
  { name: "Other", value: 0 },
];
const GENDER_COLORS = ["#0fa2f7", "#f7920f", "#30961c"];

const ageData: AgeDistribution[] = [
  { ageGroup: "0-12", count: 25 },
  { ageGroup: "13-17", count: 20 },
  { ageGroup: "18-30", count: 65 },
  { ageGroup: "31-50", count: 50 },
  { ageGroup: "51+", count: 20 },
];

const campData = [
  { month: "August", total: 1400 },
  { month: "September", total: 20000 },
  { month: "October", total: 18000 },
  { month: "November", total: 900 },
  { month: "December", total: 12000 },
];

const maritalStatusData: MaritalStatusData[] = [
  { name: "Single", value: 75 },
  { name: "Married", value: 95 },
  { name: "Other", value: 10 },
];
const MARITAL_COLORS = ["#ffc658", "#ff8042", "#00c49f", "#0088FE"];

const lastDayChange =
  ((campData[3].total - campData[2].total) / campData[2].total) * 100;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-md bg-popover p-2 text-popover-foreground shadow-md">
        <p className="font-semibold text-[12px] text-gray-800">{label}</p>
        <p className=" text-[10px] font-light">
          GHS {data.total.toLocaleString()}.00 Offering
        </p>
      </div>
    );
  }
  return null;
};

const CustomAttendanceTooltip: React.FC<any> = ({
  active,
  payload,
  label,
  dailyDemographics,
}) => {
  if (active && payload && payload.length && label) {
    const dayData = dailyDemographics[label];
    const totalDayAttendance = payload.reduce(
      (sum: any, entry: any) => sum + (entry.value ?? 0),
      0
    );

    return (
      <div className="rounded-md border bg-popover p-2 text-popover-foreground shadow-md">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">
          Total Attendance: {totalDayAttendance.toLocaleString()}
        </p>
        {dayData && (
          <>
            <div className="mt-2">
              <p className="text-xs font-medium">Gender Breakdown:</p>
              {dayData.gender.map((item: any, index: any) => (
                <p key={index} className="text-xs">
                  {item.name}: {item.value.toLocaleString()}
                </p>
              ))}
            </div>
            <div className="mt-2">
              <p className="text-xs font-medium">Age Breakdown:</p>
              {dayData.age.map((item: any, index: any) => (
                <p key={index} className="text-xs">
                  {item.ageGroup}: {item.count.toLocaleString()}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
  return null;
};

export default function NetworkDashboard() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const goToPayment = () => {
    setLoading(true);

    setTimeout(() => {
      router.push("/web/pastor/payment");
    }, 500);
  };
  if (loading) {
    return <FullPageLoader />;
  }
  return (
    <div className="w-full mx-auto pb-16 ">
      <div className="w-full">
        <div className="relative absolute h-full w-full">
          <Header />{" "}
          <div className=" w-full">
            <div className="w-full space-y-2 bg-white p-5 rounded-md border">
              <div className="flex items-center">
                <div>
                  <h1 className="mb-2 text-[15px] font-bold">
                    {networkInfo.name} - Camp Dashboard
                  </h1>
                  <p className="text-xs text-gray-600">
                    Network overview for {networkInfo.pastor} |{" "}
                    {networkInfo.location}
                  </p>
                </div>
              </div>
            </div>
            <Separator className="mt-4" />
            <div className="mb-8 mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Network Payments */}
              <Card className="border-b-4 payment relative border-b-[#0fa2f7]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Network Payments
                  </CardTitle>
                  <button className="bg-[#0fa2f7]/15 text-[#0fa2f7] p-2 rounded-md">
                    <Wallet className="h-4 w-4" />
                  </button>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">
                    GHS {totalPayments.toLocaleString()}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs mt-1 text-muted-foreground">
                      <span className="bg-[#30961c]/15 text-[#30961c] px-1.5 py-0.5 mr-1.5 rounded-full">
                        +18.5%
                      </span>
                      from last week
                    </p>
                  </div>
                  <div className="flex items-center mt-1 gap-2.5">
                    <span className="bg-[#ff8042] rounded-full h-[7px] w-[7px]" />
                    <div className="text-xs flex items-center text-muted-foreground">
                      Camp registration payments
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Camp Registrations */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Camp Registered
                  </CardTitle>
                  <button className="bg-[#0fa2f7]/15 text-[#0fa2f7] p-2 rounded-md">
                    <UserCheck className="h-4 w-4" />
                  </button>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalRegistered.toLocaleString()}
                  </div>
                  <div>
                    <div className="text-xs flex mt-1 items-center text-muted-foreground">
                      <div className="bg-[#30961c]/15 flex items-center gap-1 px-1.5 mr-1 py-0.5 rounded-xl">
                        <TrendingUp size={14} color="#30961c" />
                        <span className="text-[#30961c] pr-2.5">+12</span>
                      </div>
                      <div>
                        <span>people today</span>
                      </div>
                    </div>
                    <div className="flex items-center mt-1 gap-2.5">
                      <span className="bg-[#ff8042] rounded-full h-[7px] w-[7px]" />
                      <div className="text-xs flex items-center text-muted-foreground">
                        {registeredByOthers.toLocaleString()} people registered
                        by other users
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Average Attendance */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Avg Daily Attendance
                  </CardTitle>
                  <button className="bg-[#0fa2f7]/15 text-[#0fa2f7] p-2 rounded-md">
                    <CalendarDays className="h-4 w-4" />
                  </button>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(
                      attendanceData.reduce(
                        (sum, day) =>
                          sum + day.morning + day.afternoon + day.evening,
                        0
                      ) / attendanceData.length
                    ).toFixed(0)}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="bg-[#ff8042] rounded-full h-[7px] w-[7px]"></span>
                    <p className="text-xs text-muted-foreground">
                      Kabod Assembly Network
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="w-full grid gap-6 grid-cols-1 lg:grid-cols-2">
              {/* Camp Service Offerings */}
              <Card>
                <CardHeader>
                  <CardTitle>Network Camp Payments</CardTitle>
                  <CardDescription>
                    Monthly payments collected from{" "}
                    {networkInfo?.name ?? "Kabod Assembly"} for the 4-month camp
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={campData} accessibilityLayer>
                        <defs>
                          <linearGradient
                            id="colorPayment"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#0fa2f7"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="#4db9f7"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#000" }}
                        />
                        <YAxis
                          domain={[0, 4500]}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          tickFormatter={(value) =>
                            `GHS ${value.toLocaleString()}`
                          }
                        />
                        <Tooltip
                          content={
                            <CustomTooltip cursor={{ stroke: "transparent" }} />
                          }
                        />
                        <Area
                          type="monotone"
                          dataKey="total"
                          stroke="#0fa2f7"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorPayment)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bottom summary */}
                  <div className="mt-6 px-3">
                    <div className="flex items-center text-sm gap-2 mb-2">
                      <span className="text-gray-900 font-medium">
                        Payments
                      </span>
                      <span className="text-[#30961c] font-medium">
                        increased
                      </span>
                      <span className="text-gray-900 font-medium">
                        by {lastDayChange.toFixed(1)}% on final month
                      </span>
                      <svg
                        className="w-4 h-4 text-[#30961c]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Month 1 - Month 4 2025
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Gender Breakdown */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Network Gender Distribution</CardTitle>
                  <CardDescription>
                    Gender breakdown of registered network members.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ChartContainer
                    config={{
                      male: { label: "Male", color: GENDER_COLORS[0] },
                      female: { label: "Female", color: GENDER_COLORS[1] },
                    }}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={genderData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          label
                        >
                          {genderData.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={GENDER_COLORS[index % GENDER_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 mt-8">
              {/* Age Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Network Age Distribution</CardTitle>
                  <CardDescription>
                    Age categories of network members.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ChartContainer
                    config={{
                      count: { label: "Count", color: "#f59e0b" },
                    }}
                    className="h-[250px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart accessibilityLayer data={ageData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="ageGroup"
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          dot={{ fill: "#f59e0b", r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Marital Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Marital Status Distribution</CardTitle>
                  <CardDescription>
                    Marital status breakdown of network attendees.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ChartContainer
                    config={{
                      single: { label: "Single", color: MARITAL_COLORS[0] },
                      married: { label: "Married", color: MARITAL_COLORS[1] },
                      widowed: { label: "Other", color: MARITAL_COLORS[2] },
                    }}
                    className="h-[250px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={maritalStatusData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          label
                        >
                          {maritalStatusData.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                MARITAL_COLORS[index % MARITAL_COLORS.length]
                              }
                            />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/** */}

              <Card>
                <CardHeader>
                  <CardTitle>Network Daily Service Attendance</CardTitle>
                  <CardDescription>
                    Attendance breakdown for Morning, Afternoon, and Evening
                    services from {networkInfo.name}.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      morning: {
                        label: "Morning",
                        color: "hsl(210 40% 96.1%)",
                      },
                      afternoon: {
                        label: "Afternoon",
                        color: "hsl(217.2 91.2% 59.8%)",
                      },
                      evening: {
                        label: "Evening",
                        color: "hsl(142.1 76.2% 36.3%)",
                      },
                    }}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={attendanceData}>
                        <XAxis
                          dataKey="day"
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip
                          content={
                            <CustomAttendanceTooltip
                              dailyDemographics={dailyDemographics}
                            />
                          }
                        />
                        <Legend />
                        <Bar
                          dataKey="morning"
                          fill="var(--color-morning)"
                          stackId="a"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="afternoon"
                          fill="var(--color-afternoon)"
                          stackId="a"
                        />
                        <Bar
                          dataKey="evening"
                          fill="var(--color-evening)"
                          stackId="a"
                          radius={[0, 0, 4, 4]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
