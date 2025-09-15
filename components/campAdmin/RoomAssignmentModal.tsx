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
import { X } from "lucide-react";

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

interface RoomAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
  onAssignMember: (roomId: string, member: Member) => void;
  onRemoveMember: (roomId: string, memberId: string) => void;
  onSetKeyHolder: (roomId: string, memberId: string) => void;
}

const RoomAssignmentModal = ({
  isOpen,
  onClose,
  room,
  onAssignMember,
  onRemoveMember,
  onSetKeyHolder,
}: RoomAssignmentModalProps) => {
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");

  const handleAssignMember = () => {
    if (newMemberName && newMemberEmail && room) {
      const newMember: Member = {
        id: Date.now().toString(),
        name: newMemberName,
        email: newMemberEmail,
      };
      onAssignMember(room.room, newMember);
      setNewMemberName("");
      setNewMemberEmail("");
    }
  };

  if (!room) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Room {room.room}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Room Status */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Occupancy</span>
              <Badge
                variant={room.status === "full" ? "destructive" : "default"}
              >
                {room.occupied}/4 occupied
              </Badge>
            </div>
            {room.keyHolder && (
              <p className="text-sm text-gray-600">
                Key Holder:{" "}
                <span className="font-medium">{room.keyHolder}</span>
              </p>
            )}
          </div>

          {/* Current Members */}
          <div>
            <Label className="text-sm font-medium">Current Members</Label>
            <div className="mt-2 space-y-2">
              {room.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div>
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-gray-600">{member.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {room.keyHolder === member.name ? (
                      <Badge variant="secondary" className="text-xs">
                        Key Holder
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onSetKeyHolder(room.room, member.id)}
                        className="text-xs"
                      >
                        Set as Key Holder
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemoveMember(room.room, member.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Member */}
          {room.occupied < 4 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Add New Member</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Member name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                />
                <Input
                  placeholder="Member email"
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                />
                <Button
                  onClick={handleAssignMember}
                  disabled={!newMemberName || !newMemberEmail}
                  className="w-full"
                >
                  Assign to Room
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomAssignmentModal;
