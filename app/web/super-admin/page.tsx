"use client";

import Header from "@/components/Header";
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
  DollarSign,
  Users,
  CalendarDays,
  TrendingUp,
  Wallet,
  Sunset,
  Sun,
  Moon,
} from "lucide-react";
import React, { useState } from "react";
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
  TooltipProps,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const totalPayments = 125000;
const totalRegistered = 1200;
const registeredByOthers = 120;

const attendanceData: AttendanceDataItem[] = [
  { day: "Day 1", morning: 1800, afternoon: 1750, evening: 1900 },
  { day: "Day 2", morning: 1950, afternoon: 1880, evening: 2050 },
  { day: "Day 3", morning: 2100, afternoon: 2000, evening: 2200 },
  { day: "Day 4", morning: 2250, afternoon: 2150, evening: 2300 },
];

const dailyDemographics: DailyDemographics = {
  "Day 1": {
    gender: [
      { name: "Male", value: 2700 },
      { name: "Female", value: 2750 },
      { name: "Other", value: 2750 },
    ],
    age: [
      { ageGroup: "0-12", count: 500 },
      { ageGroup: "13-17", count: 400 },
      { ageGroup: "18-30", count: 1500 },
      { ageGroup: "31-50", count: 1200 },
      { ageGroup: "51+", count: 850 },
    ],
  },
  "Day 2": {
    gender: [
      { name: "Male", value: 2800 },
      { name: "Female", value: 2900 },
      { name: "Other", value: 2750 },
    ],
    age: [
      { ageGroup: "0-12", count: 550 },
      { ageGroup: "13-17", count: 420 },
      { ageGroup: "18-30", count: 1600 },
      { ageGroup: "31-50", count: 1300 },
      { ageGroup: "51+", count: 900 },
    ],
  },
  "Day 3": {
    gender: [
      { name: "Male", value: 3000 },
      { name: "Female", value: 3100 },
      { name: "Other", value: 2750 },
    ],
    age: [
      { ageGroup: "0-12", count: 600 },
      { ageGroup: "13-17", count: 450 },
      { ageGroup: "18-30", count: 1700 },
      { ageGroup: "31-50", count: 1400 },
      { ageGroup: "51+", count: 950 },
    ],
  },
  "Day 4": {
    gender: [
      { name: "Male", value: 3200 },
      { name: "Female", value: 3300 },
      { name: "Other", value: 2750 },
    ],
    age: [
      { ageGroup: "0-12", count: 650 },
      { ageGroup: "13-17", count: 480 },
      { ageGroup: "18-30", count: 1800 },
      { ageGroup: "31-50", count: 1500 },
      { ageGroup: "51+", count: 1000 },
    ],
  },
};

const genderData: GenderData[] = [
  { name: "Male", value: 600 },
  { name: "Female", value: 200 },
  { name: "Other", value: 100 },
];
const GENDER_COLORS = ["#0fa2f7", "#f7920f", "#30961c"];

const ageData: AgeDistribution[] = [
  { ageGroup: "0-12", count: 300 },
  { ageGroup: "13-17", count: 250 },
  { ageGroup: "18-30", count: 800 },
  { ageGroup: "31-50", count: 700 },
  { ageGroup: "51+", count: 50 },
];

const campData = [
  { day: "Day 1", total: 1350 },
  { day: "Day 2", total: 1650 },
  { day: "Day 3", total: 1520 },
  { day: "Day 4", total: 1950 },
];

const maritalStatusData: MaritalStatusData[] = [
  { name: "Single", value: 1000 },
  { name: "Married", value: 1200 },
  { name: "Other", value: 150 },
];
const MARITAL_COLORS = ["#ffc658", "#ff8042", "#00c49f", "#0088FE"];

const regionData: RegionData[] = [
  { region: "Greater Accra", count: 400 },
  { region: "Ashanti", count: 300 },
  { region: "Central", count: 300 },
  { region: "Volta", count: 40 },
  { region: "Northern", count: 150 },
  { region: "Bono", count: 122 },
];
interface AttendanceDataItem {
  day: string;
  morning: number;
  afternoon: number;
  evening: number;
}

interface CustomAttendanceTooltipProps extends TooltipProps<number, string> {
  dailyDemographics: DailyDemographics;
}
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

const CustomAttendanceTooltip: React.FC<CustomAttendanceTooltipProps> = ({
  active,
  payload,
  label,
  dailyDemographics,
}) => {
  if (active && payload && payload.length && label) {
    const dayData = dailyDemographics[label];
    const totalDayAttendance = payload.reduce(
      (sum, entry) => sum + (entry.value ?? 0),
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
              {dayData.gender.map((item, index) => (
                <p key={index} className="text-xs">
                  {item.name}: {item.value.toLocaleString()}
                </p>
              ))}
            </div>
            <div className="mt-2">
              <p className="text-xs font-medium">Age Breakdown:</p>
              {dayData.age.map((item, index) => (
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

export default function Dashboard() {
  const [selectedService, setSelectedService] = useState("Morning");
  const [selectedDay, setSelectedDay] = useState("Day 1");

  // Helper function to get attendance data for a specific day
  const getAttendanceForDay = (day: string) => {
    return attendanceData.find((item) => item.day === day) || attendanceData[0];
  };

  // Helper function to calculate percentage change
  const getPercentageChange = (current: number, previous: number) => {
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const getServiceConfig = (service: string) => {
    switch (service) {
      case "Morning":
        return {
          icon: Sun,
          color: "#f59e0b",
          bgColor: "bg-[#f59e0b]/15",
          borderColor: "border-b-[#f59e0b]",
        };
      case "Afternoon":
        return {
          icon: Sunset,
          color: "#0fa2f7",
          bgColor: "bg-[#0fa2f7]/15",
          borderColor: "border-b-[#0fa2f7]",
        };
      case "Evening":
        return {
          icon: Moon,
          color: "#30961c",
          bgColor: "bg-[#30961c]/15",
          borderColor: "border-b-[#30961c]",
        };
      case "Total Daily":
        return {
          icon: CalendarDays,
          color: "#ff8042",
          bgColor: "bg-[#ff8042]/15",
          borderColor: "border-b-[#ff8042]",
        };
      default:
        return {
          icon: Sun,
          color: "#f59e0b",
          bgColor: "bg-[#f59e0b]/15",
          borderColor: "border-b-[#f59e0b]",
        };
    }
  };
  const getAttendanceValue = (day: string, service: string) => {
    const dayData = getAttendanceForDay(day);
    switch (service) {
      case "Morning":
        return dayData.morning;
      case "Afternoon":
        return dayData.afternoon;
      case "Evening":
        return dayData.evening;
      case "Total Daily":
        return dayData.morning + dayData.afternoon + dayData.evening;
      default:
        return dayData.morning;
    }
  };
  return (
    <div className="w-full mx-auto bg-neutral-100 pb-10 pt-24 p-4 md:p-">
      <Header />

      <div className="w-full space-y-2 p-4 bg-white rounded-md border">
        <h1 className="mb-2 text-[15px] font-bold">Camp Dashboard Overview</h1>
        <p className=" text-xs text-gray-600">
          A centralized view of registrations, attendance, and event activities.
        </p>
      </div>

      <Separator className="mt-4" />
      {/* Overview Section */}
      <div className="mb-8 mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Payments */}
        <Card className="border-b-4 payment border-b-[#0fa2f7]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Payments
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
              <p className="text-[11px] leading-4 font-medium mt-1 text-muted-foreground">
                <span className="bg-[#30961c]/15 text-[#30961c] px-1.5 py-0.5 mr-1.5 rounded-full">
                  {" "}
                  +20.1%{" "}
                </span>
                from last week
              </p>
              <div className="flex items-center mt-1.5 gap-2.5">
                <span className="bg-[#ff8042] rounded-full h-[7px] w-[7px]" />
                <p className="text-[11px] leading-4 font-medium text-muted-foreground">
                  Camp registration amount
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registered */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Registered People
            </CardTitle>

            <button className="bg-[#0fa2f7]/15 text-[#0fa2f7] p-2 rounded-md">
              <Users className="h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalRegistered.toLocaleString()}
            </div>

            <div>
              <div className="flex items-center mt-1 gap-2.5">
                <span className="bg-[#ff8042] rounded-full h-[7px] w-[7px]" />
                <div className="text-xs flex items-center text-muted-foreground">
                  {" "}
                  {registeredByOthers.toLocaleString()} registered by others{" "}
                </div>
              </div>
              <div className="text-xs flex mt-1 items-center text-muted-foreground">
                {" "}
                <div className="bg-[#30961c]/15 flex items-center gap-1 px-1.5 mr-1 py-0.5 rounded-xl">
                  <TrendingUp size={14} color="#30961c" />{" "}
                  <span className="text-[#30961c] pr-2.5">+20</span>
                </div>
                <div>
                  <span>people today</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Attendance */}

        <Card className="border-b-4 payment border-b-[#0fa2f7]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Camp Offering</CardTitle>

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
                  {" "}
                  +20.1%{" "}
                </span>
                from {selectedDay}
              </p>
              <div className="flex items-center mt-1.5 gap-2.5">
                <span className="bg-[#ff8042] rounded-full h-[7px] w-[7px]" />
                <p className="text-xs text-muted-foreground">
                  Offering amount collected
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/**attendance for the service */}

        <Card
          className={`border-b-4 relative ${
            getServiceConfig(selectedService).borderColor
          }`}
        >
          <CardHeader className="flex w-full flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex w-full items-center gap-2">
              <Select
                value={selectedService}
                onValueChange={setSelectedService}
              >
                <SelectTrigger className="w-24 h-6 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Morning" className="text-xs">
                    Morning
                  </SelectItem>
                  <SelectItem value="Afternoon" className="text-xs">
                    Afternoon
                  </SelectItem>
                  <SelectItem value="Evening" className="text-xs">
                    Evening
                  </SelectItem>
                  <SelectItem value="Total Daily" className="text-xs">
                    Total Daily
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger className="w-20 h-6 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {attendanceData.map((item) => (
                    <SelectItem
                      key={item.day}
                      value={item.day}
                      className="text-xs"
                    >
                      {item.day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button
                className={`absolute top-6 right-4 ${
                  getServiceConfig(selectedService).bgColor
                } p-2 rounded-md`}
                style={{ color: getServiceConfig(selectedService).color }}
              >
                {React.createElement(getServiceConfig(selectedService).icon, {
                  className: "h-4 w-4",
                })}
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getAttendanceValue(
                selectedDay,
                selectedService
              ).toLocaleString()}
            </div>
            <div className="space-y-1">
              <p className="text-[11px] leading-4 font-medium mt-1 text-muted-foreground">
                <span className="bg-[#30961c]/15 text-[#30961c] px-1.5 py-0.5 mr-1.5 rounded-full">
                  +
                  {getPercentageChange(
                    getAttendanceValue(selectedDay, selectedService),
                    getAttendanceValue("Day 1", selectedService)
                  )}
                  %
                </span>
                from {selectedDay}
              </p>
              <div className="flex items-center mt-1.5 gap-2.5">
                <span
                  className="rounded-full h-[7px] w-[7px]"
                  style={{
                    backgroundColor: getServiceConfig(selectedService).color,
                  }}
                />
                <p className="text-[11px] leading-4 font-medium text-muted-foreground">
                  {selectedService === "Total Daily"
                    ? "Combined daily attendance"
                    : `${selectedService.toLowerCase()} service attendance`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Section */}
      <div className="w-full grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/** offering for the day */}

        <Card>
          <CardHeader>
            <CardTitle>Camp Service Offerings</CardTitle>
            <CardDescription>
              Daily offerings for the 4-day camp meeting
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 flex flex-col justify-between h-64 font-light text-xs text-gray-500 py-2">
                <span>
                  GHS
                  <br />
                  2,000
                </span>
                <span>
                  GHS
                  <br />
                  1,500
                </span>
                <span>
                  GHS
                  <br />
                  1,000
                </span>
                <span>
                  GHS
                  <br />
                  500
                </span>
                <span>GHS 0</span>
              </div>

              {/* Chart */}
              <div className="ml-16 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={campData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorOffering"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        #050505
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
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#000" }}
                    />
                    <YAxis hide domain={[0, 2000]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#0fa2f7"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorOffering)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Footer stats */}
            <div className="mt-6">
              <div className="flex items-center text-sm gap-2 mb-2">
                <span className="text-gray-900 font-medium">Offerings</span>
                <span className="text-[#30961c] font-medium">increased</span>
                <span className="text-gray-900 font-medium">
                  by {lastDayChange.toFixed(1)}% on final day
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
              <p className="text-gray-500 text-xs">Day 1 - Day 4 2025</p>
            </div>
          </CardContent>
        </Card>

        {/** */}

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Gender Breakdown</CardTitle>
            <CardDescription>
              Distribution of registered individuals by gender.
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

      {/* Demographic Breakdown Section */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 mt-8">
        {/* Gender */}

        {/* Age */}
        <Card>
          <CardHeader>
            <CardTitle>Age Group Distribution</CardTitle>
            <CardDescription>
              Registered individuals by age categories.
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
                  <XAxis dataKey="ageGroup" tickLine={false} axisLine={false} />
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
            <CardTitle>Marital Status</CardTitle>
            <CardDescription>
              Breakdown of marital status among attendees.
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
                        fill={MARITAL_COLORS[index % MARITAL_COLORS.length]}
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
      <div className="grid lg:grid-cols-2 grid-cols-1 w-full mt-8 gap-6">
        {/* Region */}
        <Card>
          <CardHeader>
            <CardTitle>Region Distribution</CardTitle>
            <CardDescription>Registered individuals by region.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer
              config={{
                count: { label: "Count", color: "hsl(142.1 76.2% 36.3%)" },
              }}
              className="h-[250px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={regionData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="region"
                    tickLine={false}
                    axisLine={false}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    dataKey="count"
                    fill="hsl(142.1 76.2% 36.3%)"
                    stroke="#0fa2f7"
                    strokeWidth={2}
                    dot={{ fill: "#0fa2f7", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Service Attendance</CardTitle>
            <CardDescription>
              Attendance breakdown for Morning, Afternoon, and Evening services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                morning: { label: "Morning", color: "hsl(210 40% 96.1%)" },
                afternoon: {
                  label: "Afternoon",
                  color: "hsl(217.2 91.2% 59.8%)",
                },
                evening: { label: "Evening", color: "hsl(142.1 76.2% 36.3%)" },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />{" "}
                  <YAxis tickLine={false} axisLine={false} />{" "}
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
  );
}
