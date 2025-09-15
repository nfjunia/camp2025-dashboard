"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Bed,
  CheckCircle,
  AlertCircle,
  Key,
  UserPlus,
  Calendar,
  Clock,
  TrendingUp,
  MapPin,
} from "lucide-react";
import Header from "@/components/campAdmin/Header";
import { Separator } from "@/components/ui/separator";
import RoomAssignmentModal from "@/components/campAdmin/RoomAssignmentModal";
import MemberAssignmentModal from "@/components/campAdmin/MemberAssignmentModal;";

interface Member {
  id: string;
  name: string;
  email: string;
}

interface Room {
  room: string;
  capacity: number;
  occupied: number;
  status: string;
  members: Member[];
  keyHolder?: string;
}

const attendanceData = {
  total: 150,
  present: 142,
  absent: 8,
  percentage: 94.7,
};

const initialRoomData: Room[] = [
  {
    room: "A-101",
    capacity: 4,
    occupied: 4,
    status: "full",
    members: [
      { id: "1", name: "John Smith", email: "john@example.com" },
      { id: "2", name: "Mary Johnson", email: "mary@example.com" },
      { id: "3", name: "David Wilson", email: "david@example.com" },
      { id: "4", name: "Sarah Brown", email: "sarah@example.com" },
    ],
    keyHolder: "John Smith",
  },
  {
    room: "A-102",
    capacity: 4,
    occupied: 3,
    status: "available",
    members: [
      { id: "5", name: "Michael Davis", email: "michael@example.com" },
      { id: "6", name: "Lisa Garcia", email: "lisa@example.com" },
      { id: "7", name: "Robert Miller", email: "robert@example.com" },
    ],
    keyHolder: "Michael Davis",
  },
  {
    room: "A-103",
    capacity: 4,
    occupied: 2,
    status: "available",
    members: [
      { id: "8", name: "Jennifer Lee", email: "jennifer@example.com" },
      { id: "9", name: "Christopher Taylor", email: "chris@example.com" },
    ],
    keyHolder: "Jennifer Lee",
  },
  {
    room: "B-201",
    capacity: 4,
    occupied: 4,
    status: "full",
    members: [
      { id: "10", name: "Amanda White", email: "amanda@example.com" },
      { id: "11", name: "Daniel Anderson", email: "daniel@example.com" },
      { id: "12", name: "Jessica Thomas", email: "jessica@example.com" },
      { id: "13", name: "Matthew Jackson", email: "matthew@example.com" },
    ],
    keyHolder: "Amanda White",
  },
  {
    room: "B-202",
    capacity: 4,
    occupied: 1,
    status: "available",
    members: [{ id: "14", name: "Ashley Harris", email: "ashley@example.com" }],
    keyHolder: "Ashley Harris",
  },
  {
    room: "B-203",
    capacity: 4,
    occupied: 0,
    status: "available",
    members: [],
  },
  {
    room: "C-301",
    capacity: 4,
    occupied: 4,
    status: "full",
    members: [
      { id: "15", name: "Ryan Clark", email: "ryan@example.com" },
      { id: "16", name: "Nicole Lewis", email: "nicole@example.com" },
      { id: "17", name: "Kevin Robinson", email: "kevin@example.com" },
      { id: "18", name: "Stephanie Walker", email: "stephanie@example.com" },
    ],
    keyHolder: "Ryan Clark",
  },
  {
    room: "C-302",
    capacity: 4,
    occupied: 3,
    status: "available",
    members: [
      { id: "19", name: "Brandon Hall", email: "brandon@example.com" },
      { id: "20", name: "Megan Allen", email: "megan@example.com" },
      { id: "21", name: "Tyler Young", email: "tyler@example.com" },
    ],
    keyHolder: "Brandon Hall",
  },
];

const recentAttendance = [
  { name: "John Smith", status: "present", time: "8:30 AM", room: "A-101" },
  { name: "Mary Johnson", status: "present", time: "8:45 AM", room: "A-101" },
  { name: "David Wilson", status: "absent", time: "-", room: "A-101" },
  { name: "Sarah Brown", status: "present", time: "9:00 AM", room: "A-101" },
  { name: "Michael Davis", status: "present", time: "8:25 AM", room: "A-102" },
];

const campOverviewData = {
  totalDays: 4,
  currentDay: 2,
  totalAttendees: 150,
  demographics: {
    male: 85,
    female: 65,
    ageGroups: {
      "18-25": 45,
      "26-35": 60,
      "36-45": 30,
      "46+": 15,
    },
  },
  services: {
    morning: {
      day1: { attendance: 142, theme: "Opening Ceremony" },
      day2: { attendance: 138, theme: "Faith & Fellowship" },
      day3: { attendance: 0, theme: "Spiritual Growth" },
      day4: { attendance: 0, theme: "Closing Celebration" },
    },
    evening: {
      day1: { attendance: 135, theme: "Welcome Night" },
      day2: { attendance: 140, theme: "Worship & Praise" },
      day3: { attendance: 0, theme: "Testimony Night" },
      day4: { attendance: 0, theme: "Farewell Service" },
    },
  },
};

const Page = () => {
  const [selectedView, setSelectedView] = useState<
    "overview" | "attendance" | "rooms"
  >("rooms");

  const [roomData, setRoomData] = useState<Room[]>(initialRoomData);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMemberAssignmentOpen, setIsMemberAssignmentOpen] = useState(false);

  const totalRooms = roomData.length;
  const occupiedRooms = roomData.filter((room) => room.occupied > 0).length;
  const fullRooms = roomData.filter((room) => room.status === "full").length;
  const availableRooms = totalRooms - fullRooms;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);

  const handleAssignMember = (roomId: string, member: Member) => {
    setRoomData((prev) =>
      prev.map((room) => {
        if (room.room === roomId && room.occupied < 4) {
          const newMembers = [...room.members, member];
          const newOccupied = newMembers.length;
          return {
            ...room,
            members: newMembers,
            occupied: newOccupied,
            status: newOccupied === 4 ? "full" : "available",
            keyHolder: room.keyHolder || member.name,
          };
        }
        return room;
      })
    );
  };

  const handleRemoveMember = (roomId: string, memberId: string) => {
    setRoomData((prev) =>
      prev.map((room) => {
        if (room.room === roomId) {
          const memberToRemove = room.members.find((m) => m.id === memberId);
          const newMembers = room.members.filter((m) => m.id !== memberId);
          const newOccupied = newMembers.length;

          let newKeyHolder = room.keyHolder;
          if (memberToRemove && room.keyHolder === memberToRemove.name) {
            newKeyHolder =
              newMembers.length > 0 ? newMembers[0].name : undefined;
          }

          return {
            ...room,
            members: newMembers,
            occupied: newOccupied,
            status: newOccupied === 4 ? "full" : "available",
            keyHolder: newKeyHolder,
          };
        }
        return room;
      })
    );
  };

  const handleSetKeyHolder = (roomId: string, memberId: string) => {
    setRoomData((prev) =>
      prev.map((room) => {
        if (room.room === roomId) {
          const member = room.members.find((m) => m.id === memberId);
          return {
            ...room,
            keyHolder: member?.name,
          };
        }
        return room;
      })
    );
  };

  const handleMoveMember = (
    fromRoomId: string,
    toRoomId: string,
    memberId: string
  ) => {
    setRoomData((prev) => {
      const fromRoom = prev.find((room) => room.room === fromRoomId);
      const toRoom = prev.find((room) => room.room === toRoomId);
      const member = fromRoom?.members.find((m) => m.id === memberId);

      if (!fromRoom || !toRoom || !member || toRoom.occupied >= 4) return prev;

      return prev.map((room) => {
        if (room.room === fromRoomId) {
          const newMembers = room.members.filter((m) => m.id !== memberId);
          const newOccupied = newMembers.length;
          let newKeyHolder = room.keyHolder;

          if (room.keyHolder === member.name) {
            newKeyHolder =
              newMembers.length > 0 ? newMembers[0].name : undefined;
          }

          return {
            ...room,
            members: newMembers,
            occupied: newOccupied,
            status: newOccupied === 4 ? "full" : "available",
            keyHolder: newKeyHolder,
          };
        } else if (room.room === toRoomId) {
          const newMembers = [...room.members, member];
          const newOccupied = newMembers.length;

          return {
            ...room,
            members: newMembers,
            occupied: newOccupied,
            status: newOccupied === 4 ? "full" : "available",
            keyHolder: room.keyHolder || member.name,
          };
        }
        return room;
      });
    });
  };

  const openRoomModal = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const renderOverviewContent = () => (
    <div className="space-y-6">
      {/* Camp Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-b-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Camp Progress</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Day {campOverviewData.currentDay}/4
            </div>
            <p className="text-xs text-muted-foreground">
              {(
                (campOverviewData.currentDay / campOverviewData.totalDays) *
                100
              ).toFixed(0)}
              % Complete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Attendees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campOverviewData.totalAttendees}
            </div>
            <p className="text-xs text-muted-foreground">
              Registered participants
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Attendance
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Across all services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Room Occupancy
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">Rooms utilized</p>
          </CardContent>
        </Card>
      </div>

      {/* Demographics */}
      <Card>
        <CardHeader>
          <CardTitle>Demographics Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Gender Distribution</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Male</span>
                  <Badge variant="outline">
                    {campOverviewData.demographics.male} (
                    {(
                      (campOverviewData.demographics.male /
                        campOverviewData.totalAttendees) *
                      100
                    ).toFixed(0)}
                    %)
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Female</span>
                  <Badge variant="outline">
                    {campOverviewData.demographics.female} (
                    {(
                      (campOverviewData.demographics.female /
                        campOverviewData.totalAttendees) *
                      100
                    ).toFixed(0)}
                    %)
                  </Badge>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Age Groups</h4>
              <div className="space-y-2">
                {Object.entries(campOverviewData.demographics.ageGroups).map(
                  ([age, count]) => (
                    <div
                      key={age}
                      className="flex justify-between items-center"
                    >
                      <span>{age} years</span>
                      <Badge variant="outline">
                        {count} (
                        {(
                          (count / campOverviewData.totalAttendees) *
                          100
                        ).toFixed(0)}
                        %)
                      </Badge>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Morning Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(campOverviewData.services.morning).map(
                ([day, service]) => (
                  <div
                    key={day}
                    className="flex justify-between items-center p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        {day.toUpperCase()}: {service.theme}
                      </p>
                      <p className="text-sm text-gray-600">
                        {service.attendance > 0
                          ? `${service.attendance} attendees`
                          : "Upcoming"}
                      </p>
                    </div>
                    <Badge
                      variant={service.attendance > 0 ? "default" : "secondary"}
                    >
                      {service.attendance > 0
                        ? `${((service.attendance / campOverviewData.totalAttendees) * 100).toFixed(0)}%`
                        : "Pending"}
                    </Badge>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Evening Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(campOverviewData.services.evening).map(
                ([day, service]) => (
                  <div
                    key={day}
                    className="flex justify-between items-center p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        {day.toUpperCase()}: {service.theme}
                      </p>
                      <p className="text-sm text-gray-600">
                        {service.attendance > 0
                          ? `${service.attendance} attendees`
                          : "Upcoming"}
                      </p>
                    </div>
                    <Badge
                      variant={service.attendance > 0 ? "default" : "secondary"}
                    >
                      {service.attendance > 0
                        ? `${((service.attendance / campOverviewData.totalAttendees) * 100).toFixed(0)}%`
                        : "Pending"}
                    </Badge>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderRoomsContent = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRooms}</div>
            <p className="text-xs text-muted-foreground">
              4 members per room capacity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Full Rooms</CardTitle>
            <CheckCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{fullRooms}</div>
            <p className="text-xs text-muted-foreground">At maximum capacity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Rooms
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {availableRooms}
            </div>
            <p className="text-xs text-muted-foreground">
              Ready for new assignments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Occupancy Rate
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">
              Overall room utilization
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Room Allocation Grid */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Bed className="h-5 w-5" />
              Room Allocation Status
            </CardTitle>
            <Button
              onClick={() => setIsMemberAssignmentOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Assign Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roomData.map((room, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openRoomModal(room)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Room {room.room}</h3>
                  <div
                    className={`w-3 h-3 rounded-full ${room.status === "full" ? "bg-red-500" : "bg-green-500"}`}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Occupancy</span>
                    <Badge
                      variant={
                        room.status === "full" ? "destructive" : "default"
                      }
                    >
                      {room.occupied}/4
                    </Badge>
                  </div>

                  {room.keyHolder && (
                    <div className="flex items-center gap-1 text-sm">
                      <Key className="h-3 w-3 text-yellow-600" />
                      <span className="text-gray-600">
                        Key: {room.keyHolder}
                      </span>
                    </div>
                  )}

                  <div className="pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-transparent"
                      disabled={room.status === "full"}
                    >
                      <UserPlus className="h-3 w-3 mr-1" />
                      {room.status === "full"
                        ? "Full"
                        : `${4 - room.occupied} spots left`}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-12 bg-transparent" variant="outline">
              Mark Attendance
            </Button>
            <Button
              className="h-12 bg-transparent"
              variant="outline"
              onClick={() => setIsMemberAssignmentOpen(true)}
            >
              Assign Room
            </Button>
            <Button className="h-12 bg-transparent" variant="outline">
              Generate Report
            </Button>
            <Button className="h-12 bg-transparent" variant="outline">
              Send Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Header />
        <main className="">
          <div className="w-full mx-auto space-y-6">
            {/* Header Section */}
            <div className="w-full bg-white rounded-md p-5">
              <div className="w">
                <h1 className="mb-2 text-[17px] font-bold">
                  {selectedView === "overview"
                    ? "Camp Meeting Overview"
                    : "Room Allocation Overview"}
                </h1>
                <p className="text-gray-600 mt-1">
                  {selectedView === "overview"
                    ? "4-day camp meeting progress, demographics, and service attendance"
                    : "Manage room assignments and track occupancy in real-time"}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-2">
                <Button
                  variant={"default"}
                  onClick={() => setSelectedView("overview")}
                  className={`hover:bg-transparent cursor-pointer ${selectedView === "overview" ? "border-b-[5px] border-[#0fa2f7] rounded-none text-[#0fa2f7]" : "bg-transparent border-b-[5px] border-transparent shadow-none text-black"}`}
                >
                  Overview
                </Button>
                <Button
                  variant={"default"}
                  className={`hover:bg-transparent cursor-pointer ${selectedView === "attendance" ? "border-b-[5px] border-[#0fa2f7] rounded-none text-[#0fa2f7]" : "bg-transparent border-b-[5px] border-transparent shadow-none text-black"}`}
                  onClick={() => setSelectedView("attendance")}
                >
                  Attendance
                </Button>
                <Button
                  variant={"default"}
                  onClick={() => setSelectedView("rooms")}
                  className={`hover:bg-transparent cursor-pointer ${selectedView === "rooms" ? "border-b-[5px] border-[#0fa2f7] rounded-none text-[#0fa2f7]" : "bg-transparent border-b-[5px] border-transparent shadow-none text-black"}`}
                >
                  Rooms
                </Button>
              </div>
            </div>
            <Separator />

            {selectedView === "overview" && renderOverviewContent()}
            {selectedView === "rooms" && renderRoomsContent()}
            {selectedView === "attendance" && (
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAttendance.map((person, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{person.name}</p>
                          <p className="text-sm text-gray-600">
                            Room {person.room}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              person.status === "present"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {person.status}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {person.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>

      <RoomAssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={selectedRoom}
        onAssignMember={handleAssignMember}
        onRemoveMember={handleRemoveMember}
        onSetKeyHolder={handleSetKeyHolder}
      />

      <MemberAssignmentModal
        isOpen={isMemberAssignmentOpen}
        onClose={() => setIsMemberAssignmentOpen(false)}
        rooms={roomData}
        onMoveMember={handleMoveMember}
        onAssignMember={handleAssignMember}
      />
    </div>
  );
};

export default Page;
