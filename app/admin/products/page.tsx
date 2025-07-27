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
  Package
} from "lucide-react";
import MockData from "@/data/mockData";
import { Product } from "@/models/product.model";
import { toast } from "sonner";
import Image from "next/image";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>(MockData.products);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [""],
    categoryNames: [] as string[],
    stock: "",
    brand: "",
    colors: [] as string[],
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.categoryNames.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      images: [""],
      categoryNames: [],
      stock: "",
      brand: "",
      colors: [],
    });
  };

  const handleAddProduct = () => {
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Valid price is required");
      return;
    }

    // Check if product already exists
    if (products.some(prod => prod.name.toLowerCase() === formData.name.toLowerCase())) {
      toast.error("Product with this name already exists");
      return;
    }

    const newProduct: Product = {
      id: Math.max(...products.map(p => p.id)) + 1,
      name: formData.name.trim(),
      slug: formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      images: formData.images.filter(img => img.trim() !== "") || ["/placeholder-product.jpg"],
      categoryNames: formData.categoryNames,
      rating: 0,
      stock: parseInt(formData.stock) || 0,
      discount: 0,
      brand: formData.brand || "Unknown",
      status: "active",
      featured: false,
      colors: formData.colors,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    setProducts(prev => [...prev, newProduct]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success("Product added successfully!");
  };

  const handleEditProduct = () => {
    if (!formData.name.trim() || !editingProduct) {
      toast.error("Product name is required");
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Valid price is required");
      return;
    }

    // Check if another product has the same name
    if (products.some(prod => 
      prod.id !== editingProduct.id && 
      prod.name.toLowerCase() === formData.name.toLowerCase()
    )) {
      toast.error("Product with this name already exists");
      return;
    }

    const updatedProduct: Product = {
      ...editingProduct,
      name: formData.name.trim(),
      slug: formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      images: formData.images.filter(img => img.trim() !== "") || editingProduct.images,
      categoryNames: formData.categoryNames,
      stock: parseInt(formData.stock) || 0,
      brand: formData.brand || editingProduct.brand,
      colors: formData.colors,
      updatedDate: new Date()
    };

    setProducts(prev => 
      prev.map(prod => prod.id === editingProduct.id ? updatedProduct : prod)
    );
    
    setIsEditDialogOpen(false);
    setEditingProduct(null);
    resetForm();
    toast.success("Product updated successfully!");
  };

  const handleDeleteProduct = (product: Product) => {
    setProducts(prev => prev.filter(prod => prod.id !== product.id));
    toast.success("Product deleted successfully!");
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      images: product.images,
      categoryNames: product.categoryNames,
      stock: product.stock.toString(),
      brand: product.brand,
      colors: product.colors,
    });
    setIsEditDialogOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", variant: "destructive" as const };
    if (stock < 10) return { label: "Low Stock", variant: "secondary" as const };
    return { label: "In Stock", variant: "default" as const };
  };

  const ProductForm = ({ }: { isEdit?: boolean }) => (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter product name"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="price">Price *</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
          placeholder="0.00"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="stock">Stock Quantity</Label>
        <Input
          id="stock"
          type="number"
          value={formData.stock}
          onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
          placeholder="0"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="brand">Brand</Label>
        <Input
          id="brand"
          value={formData.brand}
          onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
          placeholder="Brand name"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Enter product description"
          rows={3}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="images">Image URL</Label>
        <div className="flex gap-2">
          <Input
            id="images"
            value={formData.images[0] || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, images: [e.target.value] }))}
            placeholder="https://example.com/image.jpg"
          />
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {formData.images[0] && (
        <div className="grid gap-2">
          <Label>Preview</Label>
          <Image
            src={formData.images[0]}
            alt="Product preview"
            className="h-20 w-20 object-cover rounded border"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-product.jpg";
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
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your product inventory and listings.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Create a new product for your store.
                </DialogDescription>
              </DialogHeader>
              <ProductForm />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProduct}>Add Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Products</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
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
                <TableHead>Product</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={product.images[0] || "/placeholder-product.jpg"}
                          alt={product.name}
                          className="h-10 w-10 rounded-lg object-cover border"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-product.jpg";
                          }}
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            ID: {product.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm truncate">{product.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{formatPrice(product.price)}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={stockStatus.variant}>
                        {stockStatus.label} ({product.stock})
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{product.brand}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {product.categoryNames.slice(0, 2).map((category) => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                        {product.categoryNames.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{product.categoryNames.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => window.open(`/products/${product.slug}`, '_blank')}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditDialog(product)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteProduct(product)}
                            className="text-red-600"
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
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No products found</h3>
              {searchTerm ? (
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search terms
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">
                  Get started by adding your first product
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
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product information below.
            </DialogDescription>
          </DialogHeader>
          <ProductForm isEdit />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>Update Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
