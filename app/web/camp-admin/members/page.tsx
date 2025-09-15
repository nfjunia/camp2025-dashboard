"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  Filter,
  Church,
  UserCheck,
  Baby,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";
import { UserManagementForm } from "@/components/campAdmin/User-management-form";
import UserModal from "@/components/campAdmin/UserModal";
import Header from "@/components/campAdmin/Header";
import { Separator } from "@/components/ui/separator";
import UserProfileModal from "@/components/campAdmin/UserModal";
import Image from "next/image";

const mockUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    gender: "Female",
    age: 28,
    isKid: false,
    isHerald: true,
    network: "Downtown Campus",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    joinDate: "2022-03-15",
    avatar: "/diverse-woman-portrait.png",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    gender: "Male",
    age: 35,
    isKid: false,
    isHerald: false,
    network: "North Campus",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Ave, City, State 12345",
    joinDate: "2021-08-22",
    avatar: "/thoughtful-man.png",
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    gender: "Female",
    age: 12,
    isKid: true,
    isHerald: false,
    network: "Downtown Campus",
    phone: "+1 (555) 345-6789",
    address: "789 Pine St, City, State 12345",
    joinDate: "2023-01-10",
    avatar: "/young-woman-smiling.png",
  },
  {
    id: 4,
    name: "David Rodriguez",
    email: "david.rodriguez@email.com",
    gender: "Male",
    age: 42,
    isKid: false,
    isHerald: true,
    network: "South Campus",
    phone: "+1 (555) 456-7890",
    address: "321 Elm Dr, City, State 12345",
    joinDate: "2020-11-05",
    avatar: "/thoughtful-man.png",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    gender: "Female",
    age: 31,
    isKid: false,
    isHerald: false,
    network: "North Campus",
    phone: "+1 (555) 567-8901",
    address: "654 Maple Ln, City, State 12345",
    joinDate: "2022-07-18",
    avatar: "/diverse-woman-portrait.png",
  },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [networkFilter, setNetworkFilter] = useState("all");
  const [isKidFilter, setIsKidFilter] = useState("all");
  const [isHeraldFilter, setIsHeraldFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const networks = [...new Set(users.map((user) => user.network))];

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender =
        genderFilter === "all" || user.gender === genderFilter;
      const matchesNetwork =
        networkFilter === "all" || user.network === networkFilter;
      const matchesIsKid =
        isKidFilter === "all" ||
        (isKidFilter === "yes" && user.isKid) ||
        (isKidFilter === "no" && !user.isKid);
      const matchesIsHerald =
        isHeraldFilter === "all" ||
        (isHeraldFilter === "yes" && user.isHerald) ||
        (isHeraldFilter === "no" && !user.isHerald);

      return (
        matchesSearch &&
        matchesGender &&
        matchesNetwork &&
        matchesIsKid &&
        matchesIsHerald
      );
    });
  }, [
    users,
    searchTerm,
    genderFilter,
    networkFilter,
    isKidFilter,
    isHeraldFilter,
  ]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, genderFilter, networkFilter, isKidFilter, isHeraldFilter]);

  const getActiveFiltersCount = () => {
    let count = 0;
    if (genderFilter !== "all") count++;
    if (networkFilter !== "all") count++;
    if (isKidFilter !== "all") count++;
    if (isHeraldFilter !== "all") count++;
    return count;
  };

  const handleAddUser = (userData: any) => {
    const newUser = {
      ...userData,
      id: Math.max(...users.map((u) => u.id)) + 1,
      joinDate: new Date().toISOString().split("T")[0],
      avatar: `/placeholder.svg?height=40&width=40&query=${userData.gender === "Male" ? "man" : "woman"}`,
    };
    setUsers([...users, newUser]);
    setIsAddUserOpen(false);
  };

  const handleEditUser = (userData: any) => {
    setUsers(
      users.map((user) =>
        user.id === editingUser.id ? { ...user, ...userData } : user
      )
    );
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
      setSelectedUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const handleBulkDelete = () => {
    if (selectedUsers.size === 0) return;

    if (
      confirm(
        `Are you sure you want to delete ${selectedUsers.size} selected user(s)?`
      )
    ) {
      setUsers(users.filter((user) => !selectedUsers.has(user.id)));
      setSelectedUsers(new Set());
    }
  };

  const handleSelectUser = (userId: number, checked: any) => {
    setSelectedUsers((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(userId);
      } else {
        newSet.delete(userId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: any) => {
    if (checked) {
      setSelectedUsers(new Set(paginatedUsers.map((user) => user.id)));
    } else {
      setSelectedUsers(new Set());
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setGenderFilter("all");
    setNetworkFilter("all");
    setIsKidFilter("all");
    setIsHeraldFilter("all");
    setSelectedUsers(new Set());
  };

  return (
    <div className="min-h-screen w-full">
      <Header />

      <div className=" mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-b-4 border-b-[#0fa2f7]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Members
              </CardTitle>

              <button className="bg-[#0fa2f7]/10 p-2 rounded-md">
                <Users className="h-4 w-4 text-[#0fa2f7]" />
              </button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Heralds</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter((u) => u.isHerald).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Children</CardTitle>
              <Baby className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter((u) => u.isKid).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Networks</CardTitle>
              <Church className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{networks.length}</div>
            </CardContent>
          </Card>
        </div>
        <div className="bg-white">
          <Card className="mb-6 border-none rounded-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                All Users
              </CardTitle>
              <CardDescription>View and manage user's</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 bg-transparent"
                    >
                      <Filter className="h-4 w-4" />
                      Filters
                      {getActiveFiltersCount() > 0 && (
                        <Badge
                          variant="secondary"
                          className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                        >
                          {getActiveFiltersCount()}
                        </Badge>
                      )}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Filter Members</h4>
                        {getActiveFiltersCount() > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="h-auto p-1"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label
                            htmlFor="gender-filter"
                            className="text-sm font-medium"
                          >
                            Gender
                          </Label>
                          <Select
                            value={genderFilter}
                            onValueChange={setGenderFilter}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="All Genders" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Genders</SelectItem>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label
                            htmlFor="network-filter"
                            className="text-sm font-medium"
                          >
                            Network
                          </Label>
                          <Select
                            value={networkFilter}
                            onValueChange={setNetworkFilter}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="All Networks" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Networks</SelectItem>
                              {networks.map((network) => (
                                <SelectItem key={network} value={network}>
                                  {network}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label
                            htmlFor="kid-filter"
                            className="text-sm font-medium"
                          >
                            Age Group
                          </Label>
                          <Select
                            value={isKidFilter}
                            onValueChange={setIsKidFilter}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="All Ages" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Ages</SelectItem>
                              <SelectItem value="yes">Children</SelectItem>
                              <SelectItem value="no">Adults</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label
                            htmlFor="herald-filter"
                            className="text-sm font-medium"
                          >
                            Herald Status
                          </Label>
                          <Select
                            value={isHeraldFilter}
                            onValueChange={setIsHeraldFilter}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="All Members" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Members</SelectItem>
                              <SelectItem value="yes">Heralds</SelectItem>
                              <SelectItem value="no">
                                Regular Members
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {getActiveFiltersCount() > 0 && (
                        <div className="pt-2 border-t">
                          <Button
                            variant="outline"
                            onClick={clearFilters}
                            className="w-full bg-transparent"
                          >
                            Clear All Filters
                          </Button>
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Members ({filteredUsers.length})
            </h2>
            <div className="flex items-center gap-4">
              {selectedUsers.size > 0 && (
                <Button
                  variant="destructive"
                  onClick={handleBulkDelete}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Selected ({selectedUsers.size})
                </Button>
              )}
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Member</DialogTitle>
                    <DialogDescription>
                      Add a new member to the church directory.
                    </DialogDescription>
                  </DialogHeader>
                  <UserManagementForm onSubmit={handleAddUser} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <Separator />
          <Card className="border-0">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          paginatedUsers.length > 0 &&
                          paginatedUsers.every((user) =>
                            selectedUsers.has(user.id)
                          )
                        }
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all users"
                      />
                    </TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox
                          className="border-[#0fa2f7]"
                          checked={selectedUsers.has(user.id)}
                          onCheckedChange={(checked: any) =>
                            handleSelectUser(user.id, checked)
                          }
                          aria-label={`Select ${user.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {user.gender} • Age {user.age}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{user.email}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.network}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {user.isKid && (
                            <Badge variant="secondary" className="text-xs">
                              Child
                            </Badge>
                          )}
                          {user.isHerald && (
                            <Badge variant="default" className="text-xs">
                              Herald
                            </Badge>
                          )}
                          {!user.isKid && !user.isHerald && (
                            <Badge variant="outline" className="text-xs">
                              Member
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Image
                              src={require("@/public/icons/folder.png")}
                              alt=""
                              width={18}
                              height={18}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} results
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No members found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>

      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {editingUser && (
        <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Member</DialogTitle>
              <DialogDescription>Update member information.</DialogDescription>
            </DialogHeader>
            <UserManagementForm
              initialData={editingUser}
              onSubmit={handleEditUser}
              isEditing
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
