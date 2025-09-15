"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, ArrowRight } from "lucide-react";

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

interface MemberAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: Room[];
  onMoveMember: (
    fromRoomId: string,
    toRoomId: string,
    memberId: string
  ) => void;
  onAssignMember: (roomId: string, member: Member) => void;
}

const MemberAssignmentModal = ({
  isOpen,
  onClose,
  rooms,
  onMoveMember,
  onAssignMember,
}: MemberAssignmentModalProps) => {
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [fromRoom, setFromRoom] = useState("");
  const [toRoom, setToRoom] = useState("");

  const availableRooms = rooms.filter((room) => room.occupied < 4);
  const occupiedRooms = rooms.filter((room) => room.occupied > 0);

  const handleAssignNewMember = () => {
    if (newMemberName && newMemberEmail && selectedRoom) {
      const newMember: Member = {
        id: Date.now().toString(),
        name: newMemberName,
        email: newMemberEmail,
      };
      onAssignMember(selectedRoom, newMember);
      setNewMemberName("");
      setNewMemberEmail("");
      setSelectedRoom("");
    }
  };

  const handleMoveMember = () => {
    if (selectedMember && fromRoom && toRoom) {
      onMoveMember(fromRoom, toRoom, selectedMember);
      setSelectedMember("");
      setFromRoom("");
      setToRoom("");
    }
  };

  const getAvailableMembersForRoom = (roomId: string) => {
    const room = rooms.find((r) => r.room === roomId);
    return room?.members || [];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Member Assignment Center</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="assign" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assign">Assign New Member</TabsTrigger>
            <TabsTrigger value="move">Move Existing Member</TabsTrigger>
          </TabsList>

          <TabsContent value="assign" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">
                  Member Information
                </Label>
                <div className="space-y-2 mt-2">
                  <Input
                    placeholder="Full name"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                  />
                  <Input
                    placeholder="Email address"
                    type="email"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Select Room</Label>
                <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose available room" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRooms.map((room) => (
                      <SelectItem key={room.room} value={room.room}>
                        Room {room.room} - {4 - room.occupied} spots available
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleAssignNewMember}
                disabled={!newMemberName || !newMemberEmail || !selectedRoom}
                className="w-full"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Assign to Room
              </Button>
            </div>

            {/* Available Rooms Overview */}
            <div className="mt-6">
              <Label className="text-sm font-medium">Available Rooms</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {availableRooms.map((room) => (
                  <div key={room.room} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Room {room.room}</span>
                      <Badge variant="outline">{room.occupied}/4</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {4 - room.occupied} spots available
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="move" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">From Room</Label>
                <Select
                  value={fromRoom}
                  onValueChange={(value) => {
                    setFromRoom(value);
                    setSelectedMember("");
                  }}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select source room" />
                  </SelectTrigger>
                  <SelectContent>
                    {occupiedRooms.map((room) => (
                      <SelectItem key={room.room} value={room.room}>
                        Room {room.room} - {room.occupied} members
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {fromRoom && (
                <div>
                  <Label className="text-sm font-medium">Select Member</Label>
                  <Select
                    value={selectedMember}
                    onValueChange={setSelectedMember}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose member to move" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableMembersForRoom(fromRoom).map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name} - {member.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center justify-center py-2">
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>

              <div>
                <Label className="text-sm font-medium">To Room</Label>
                <Select value={toRoom} onValueChange={setToRoom}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select destination room" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRooms
                      .filter((room) => room.room !== fromRoom)
                      .map((room) => (
                        <SelectItem key={room.room} value={room.room}>
                          Room {room.room} - {4 - room.occupied} spots available
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleMoveMember}
                disabled={!selectedMember || !fromRoom || !toRoom}
                className="w-full"
              >
                Move Member
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MemberAssignmentModal;
