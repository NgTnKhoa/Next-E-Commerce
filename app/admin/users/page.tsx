"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus,
  Search, 
  Edit,
  Eye, 
  MoreHorizontal,
  Users as UsersIcon,
  UserCheck,
  UserX,
  Shield,
  Mail,
  Calendar,
  Ban,
  CheckCircle,
  UserPlus
} from "lucide-react";
import { toast } from "sonner";

// Mock user data - replace with actual data source
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "customer",
    status: "active",
    avatar: "/avatars/john.jpg",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    joinDate: new Date("2023-06-15"),
    lastLogin: new Date("2024-01-15T10:30:00"),
    totalOrders: 12,
    totalSpent: 2499.99,
    verified: true
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    status: "active",
    avatar: "/avatars/jane.jpg",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    joinDate: new Date("2023-01-10"),
    lastLogin: new Date("2024-01-16T09:15:00"),
    totalOrders: 0,
    totalSpent: 0,
    verified: true
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "customer",
    status: "inactive",
    avatar: "/avatars/mike.jpg",
    phone: "+1 (555) 456-7890",
    address: "789 Pine St, Chicago, IL 60601",
    joinDate: new Date("2023-09-22"),
    lastLogin: new Date("2023-12-01T14:20:00"),
    totalOrders: 3,
    totalSpent: 599.99,
    verified: false
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "customer",
    status: "suspended",
    avatar: "/avatars/sarah.jpg",
    phone: "+1 (555) 321-0987",
    address: "321 Elm St, Miami, FL 33101",
    joinDate: new Date("2023-11-08"),
    lastLogin: new Date("2024-01-10T16:45:00"),
    totalOrders: 8,
    totalSpent: 1299.99,
    verified: true
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    role: "moderator",
    status: "active",
    avatar: "/avatars/david.jpg",
    phone: "+1 (555) 654-3210",
    address: "654 Maple Dr, Seattle, WA 98101",
    joinDate: new Date("2023-03-20"),
    lastLogin: new Date("2024-01-14T11:30:00"),
    totalOrders: 1,
    totalSpent: 199.99,
    verified: true
  }
];

type User = typeof mockUsers[0];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "customer",
  });

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      role: "customer",
    });
  };

  const handleAddUser = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    // Check if user already exists
    if (users.some(user => user.email.toLowerCase() === formData.email.toLowerCase())) {
      toast.error("User with this email already exists");
      return;
    }

    const newUser: User = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      role: formData.role as "customer" | "admin" | "moderator",
      status: "active",
      avatar: "/avatars/default.jpg",
      joinDate: new Date(),
      lastLogin: new Date(),
      totalOrders: 0,
      totalSpent: 0,
      verified: false
    };

    setUsers(prev => [...prev, newUser]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success("User added successfully!");
  };

  const handleEditUser = () => {
    if (!formData.name.trim() || !formData.email.trim() || !editingUser) {
      toast.error("Name and email are required");
      return;
    }

    // Check if another user has the same email
    if (users.some(user => 
      user.id !== editingUser.id && 
      user.email.toLowerCase() === formData.email.toLowerCase()
    )) {
      toast.error("User with this email already exists");
      return;
    }

    const updatedUser: User = {
      ...editingUser,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      role: formData.role as "customer" | "admin" | "moderator",
    };

    setUsers(prev => 
      prev.map(user => user.id === editingUser.id ? updatedUser : user)
    );
    
    setIsEditDialogOpen(false);
    setEditingUser(null);
    resetForm();
    toast.success("User updated successfully!");
  };

  const handleStatusUpdate = (userId: number, newStatus: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    toast.success(`User status updated to ${newStatus}`);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    toast.success("User deleted successfully!");
  };

  const openViewDialog = (user: User) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    });
    setIsEditDialogOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "active":
        return { 
          label: "Active", 
          variant: "default" as const, 
          icon: UserCheck,
          color: "text-green-600"
        };
      case "inactive":
        return { 
          label: "Inactive", 
          variant: "secondary" as const, 
          icon: UserX,
          color: "text-gray-600"
        };
      case "suspended":
        return { 
          label: "Suspended", 
          variant: "destructive" as const, 
          icon: Ban,
          color: "text-red-600"
        };
      default:
        return { 
          label: status, 
          variant: "secondary" as const, 
          icon: UserX,
          color: "text-gray-600"
        };
    }
  };

  const getRoleInfo = (role: string) => {
    switch (role) {
      case "admin":
        return { label: "Admin", icon: Shield, color: "text-red-600" };
      case "moderator":
        return { label: "Moderator", icon: Shield, color: "text-blue-600" };
      case "customer":
        return { label: "Customer", icon: UsersIcon, color: "text-gray-600" };
      default:
        return { label: role, icon: UsersIcon, color: "text-gray-600" };
    }
  };

  const getUserStats = () => {
    const total = users.length;
    const active = users.filter(u => u.status === "active").length;
    const inactive = users.filter(u => u.status === "inactive").length;
    const suspended = users.filter(u => u.status === "suspended").length;
    const customers = users.filter(u => u.role === "customer").length;
    const admins = users.filter(u => u.role === "admin").length;

    return { total, active, inactive, suspended, customers, admins };
  };

  const stats = getUserStats();

  const UserForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter full name"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="Enter email address"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          placeholder="Enter phone number"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          value={formData.role}
          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="customer">Customer</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          placeholder="Enter address"
          rows={3}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Manage user accounts and permissions.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account for the system.
                </DialogDescription>
              </DialogHeader>
              <UserForm />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inactive</p>
                <p className="text-2xl font-bold">{stats.inactive}</p>
              </div>
              <UserX className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Suspended</p>
                <p className="text-2xl font-bold">{stats.suspended}</p>
              </div>
              <Ban className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customers</p>
                <p className="text-2xl font-bold">{stats.customers}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Admins</p>
                <p className="text-2xl font-bold">{stats.admins}</p>
              </div>
              <Shield className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Users</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const statusInfo = getStatusInfo(user.status);
                const roleInfo = getRoleInfo(user.role);
                const StatusIcon = statusInfo.icon;
                const RoleIcon = roleInfo.icon;
                
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <UserPlus className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {user.name}
                            {user.verified && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <RoleIcon className="h-4 w-4" />
                        <Badge variant="outline" className={roleInfo.color}>
                          {roleInfo.label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusInfo.variant} className="flex items-center gap-1 w-fit">
                        <StatusIcon className="h-3 w-3" />
                        {statusInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{formatDate(user.joinDate)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{user.totalOrders}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{formatPrice(user.totalSpent)}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openViewDialog(user)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditDialog(user)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "active" && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate(user.id, "suspended")}>
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend User
                            </DropdownMenuItem>
                          )}
                          {user.status === "suspended" && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate(user.id, "active")}>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Activate User
                            </DropdownMenuItem>
                          )}
                          {user.status === "inactive" && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate(user.id, "active")}>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Activate User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600"
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <UsersIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No users found</h3>
              {searchTerm ? (
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search terms
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">
                  Get started by adding your first user
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Complete user information and account details.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Full Name</Label>
                  <p className="text-sm text-muted-foreground">{selectedUser.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm text-muted-foreground">{selectedUser.phone || "Not provided"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Role</Label>
                  <Badge variant="outline" className="w-fit">
                    {getRoleInfo(selectedUser.role).label}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant={getStatusInfo(selectedUser.status).variant} className="w-fit">
                    {getStatusInfo(selectedUser.status).label}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Verified</Label>
                  <div className="flex items-center gap-2">
                    {selectedUser.verified ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <UserX className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {selectedUser.verified ? "Verified" : "Not verified"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Address</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedUser.address || "Not provided"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Join Date</Label>
                  <p className="text-sm text-muted-foreground">{formatDate(selectedUser.joinDate)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Login</Label>
                  <p className="text-sm text-muted-foreground">{formatDate(selectedUser.lastLogin)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <Label className="text-sm font-medium">Total Orders</Label>
                  <p className="text-lg font-bold">{selectedUser.totalOrders}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Total Spent</Label>
                  <p className="text-lg font-bold">{formatPrice(selectedUser.totalSpent)}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and settings.
            </DialogDescription>
          </DialogHeader>
          <UserForm isEdit />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditUser}>Update User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
