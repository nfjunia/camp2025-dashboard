"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Church,
  UserCheck,
  Baby,
} from "lucide-react";
import type { User as UserProfile } from "@/types/type";

interface UserProfileModalProps {
  user: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal = ({ user, isOpen, onClose }: UserProfileModalProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Member Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with Avatar and Basic Info */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
              />
              <AvatarFallback className="text-lg">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">
                {user.gender} • Age {user.age}
              </p>
              <div className="flex gap-2 mt-2">
                {user.isKid && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Baby className="h-3 w-3" />
                    Child
                  </Badge>
                )}
                {user.isHerald && (
                  <Badge variant="default" className="flex items-center gap-1">
                    <UserCheck className="h-3 w-3" />
                    Herald
                  </Badge>
                )}
                {!user.isKid && !user.isHerald && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Church className="h-3 w-3" />
                    Member
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
              )}
              {user.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{user.address}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Church Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Church Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Church className="h-4 w-4 text-muted-foreground" />
                <span>
                  Network: <Badge variant="outline">{user.network}</Badge>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  Joined:{" "}
                  {new Date(user.joinDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Member Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Age Group
                  </p>
                  <p>{user.isKid ? "Child (Under 18)" : "Adult (18+)"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Leadership Role
                  </p>
                  <p>
                    {user.isHerald ? "Herald (Leadership)" : "Regular Member"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Member ID
                  </p>
                  <p>#{user.id.toString().padStart(4, "0")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <Badge variant="outline" className="text-green-600">
                    Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
