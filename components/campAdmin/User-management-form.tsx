"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User, UserFormData } from "@/types/type";

interface UserManagementFormProps {
  onSubmit: (data: UserFormData) => void;
  initialData?: User;
  isEditing?: boolean;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  age: string;
  network: string;
  isKid: boolean;
  isHerald: boolean;
}

export function UserManagementForm({
  onSubmit,
  initialData,
  isEditing = false,
}: UserManagementFormProps) {
  const [formData, setFormData] = useState<FormState>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    gender: initialData?.gender || "",
    age: initialData?.age?.toString() || "",
    network: initialData?.network || "",
    isKid: initialData?.isKid || false,
    isHerald: initialData?.isHerald || false,
  });

  const networks: string[] = [
    "Downtown Campus",
    "North Campus",
    "South Campus",
    "East Campus",
    "West Campus",
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit({
      ...formData,
      gender: formData.gender as "Male" | "Female",
      age: Number.parseInt(formData.age) || 0,
    });
  };

  const handleChange = (
    field: keyof FormState,
    value: string | boolean
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => handleChange("age", e.target.value)}
            required
            min="1"
            max="120"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="123 Main St, City, State 12345"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="gender">Gender *</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => handleChange("gender", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="network">Network *</Label>
          <Select
            value={formData.network}
            onValueChange={(value) => handleChange("network", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select network" />
            </SelectTrigger>
            <SelectContent>
              {networks.map((network) => (
                <SelectItem key={network} value={network}>
                  {network}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isKid"
            checked={formData.isKid}
            onCheckedChange={(checked: any) => handleChange("isKid", checked)}
          />
          <Label htmlFor="isKid">Is Child (under 18)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isHerald"
            checked={formData.isHerald}
            onCheckedChange={(checked: any) =>
              handleChange("isHerald", checked)
            }
          />
          <Label htmlFor="isHerald">Is Herald (leadership role)</Label>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" className="w-full">
          {isEditing ? "Update Member" : "Add Member"}
        </Button>
      </div>
    </form>
  );
}
