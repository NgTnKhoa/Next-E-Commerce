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
  Trash2, 
  MoreHorizontal,
  Eye,
  Upload,
  FolderPlus
} from "lucide-react";
import MockData from "@/data/mockData";
import { Category } from "@/models/category.model";
import { toast } from "sonner";
import Image from "next/image";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>(MockData.categories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    slug: "",
    image: "",
    isActive: true,
  });

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get product count for each category
  const getCategoryProductCount = (categoryName: string) => {
    return MockData.products.filter(product => 
      product.categoryNames.includes(categoryName)
    ).length;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      slug: "",
      image: "",
      isActive: true,
    });
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleAddCategory = () => {
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    // Check if category already exists
    if (categories.some(cat => cat.name.toLowerCase() === formData.name.toLowerCase())) {
      toast.error("Category with this name already exists");
      return;
    }

    const newCategory: Category = {
      id: Math.max(...categories.map(c => c.id)) + 1,
      name: formData.name.trim(),
      description: formData.description.trim(),
      slug: formData.slug || generateSlug(formData.name),
      image: formData.image || "/placeholder-category.jpg",
      featured: false,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    setCategories(prev => [...prev, newCategory]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success("Category added successfully!");
  };

  const handleEditCategory = () => {
    if (!formData.name.trim() || !editingCategory) {
      toast.error("Category name is required");
      return;
    }

    // Check if another category has the same name
    if (categories.some(cat => 
      cat.id !== editingCategory.id && 
      cat.name.toLowerCase() === formData.name.toLowerCase()
    )) {
      toast.error("Category with this name already exists");
      return;
    }

    const updatedCategory: Category = {
      ...editingCategory,
      name: formData.name.trim(),
      description: formData.description.trim(),
      slug: formData.slug || generateSlug(formData.name),
      image: formData.image || editingCategory.image,
    };

    setCategories(prev => 
      prev.map(cat => cat.id === editingCategory.id ? updatedCategory : cat)
    );
    
    setIsEditDialogOpen(false);
    setEditingCategory(null);
    resetForm();
    toast.success("Category updated successfully!");
  };

  const handleDeleteCategory = (category: Category) => {
    const productCount = getCategoryProductCount(category.name);
    
    if (productCount > 0) {
      toast.error(`Cannot delete category. ${productCount} products are using this category.`);
      return;
    }

    setCategories(prev => prev.filter(cat => cat.id !== category.id));
    toast.success("Category deleted successfully!");
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      slug: category.slug,
      image: category.image,
      isActive: true,
    });
    setIsEditDialogOpen(true);
  };

  const CategoryForm = () => (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Category Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Enter category name"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          placeholder="category-slug"
        />
        <p className="text-xs text-muted-foreground">
          Auto-generated from name if left empty
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Enter category description"
          rows={3}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="image">Image URL</Label>
        <div className="flex gap-2">
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
            placeholder="https://example.com/image.jpg"
          />
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {formData.image && (
        <div className="grid gap-2">
          <Label>Preview</Label>
          <Image
            src={formData.image}
            alt="Category preview"
            className="h-20 w-20 object-cover rounded border"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-category.jpg";
            }}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Manage your product categories and organization.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Create a new category for organizing your products.
                </DialogDescription>
              </DialogHeader>
              <CategoryForm />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCategory}>Add Category</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Categories</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
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
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => {
                const productCount = getCategoryProductCount(category.name);
                
                return (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={category.image}
                          alt={category.name}
                          className="h-10 w-10 rounded-lg object-cover border"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-category.jpg";
                          }}
                        />
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {category.slug}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm truncate">{category.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={productCount > 0 ? "default" : "secondary"}>
                        {productCount} products
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => window.open(`/categories/${category.slug}`, '_blank')}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditDialog(category)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteCategory(category)}
                            className="text-red-600"
                            disabled={productCount > 0}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <FolderPlus className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No categories found</h3>
              {searchTerm ? (
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search terms
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">
                  Get started by creating your first category
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category information below.
            </DialogDescription>
          </DialogHeader>
          <CategoryForm />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCategory}>Update Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;
