import { useState, useEffect } from 'react';
import { useCustomers } from '@/hooks/useCustomers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, Edit, Trash2, Search, X, Users, MapPin, Phone, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import LoadingButton from '@/components/LoadingButton';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useToast } from '@/hooks/use-toast';

const CustomerList = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    city: '',
    state: '',
    pincode: '',
  });
  const [searchFilters, setSearchFilters] = useState({
    city: '',
    state: '',
    pincode: '',
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    customer?: { id: string; name: string };
  }>({ open: false });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { customers, loading, totalCount, totalPages, fetchCustomers, deleteCustomer } = useCustomers({
    page,
    limit: 10,
    filters: searchFilters,
  });

  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, [page, searchFilters, fetchCustomers]);

  const handleSearch = () => {
    setSearchFilters(filters);
    setPage(1);
    toast({
      title: 'Search applied',
      description: 'Customer list has been filtered',
    });
  };

  const handleClearFilters = () => {
    setFilters({ city: '', state: '', pincode: '' });
    setSearchFilters({ city: '', state: '', pincode: '' });
    setPage(1);
    toast({
      title: 'Filters cleared',
      description: 'Showing all customers',
    });
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteDialog({
      open: true,
      customer: { id, name }
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.customer) return;
    
    setDeleteLoading(true);
    try {
      await deleteCustomer(deleteDialog.customer.id);
      toast({
        title: 'Customer deleted',
        description: `${deleteDialog.customer.name} has been removed`,
        variant: 'destructive',
      });
      setDeleteDialog({ open: false });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete customer',
        variant: 'destructive',
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const hasActiveFilters = Object.values(searchFilters).some(f => f);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Customer Management</h1>
              <p className="text-muted-foreground">
                Manage and organize your customer database efficiently
              </p>
            </div>
            <Button size="lg" asChild className="shadow-elegant">
              <Link to="/create">
                <Plus className="h-5 w-5 mr-2" />
                Add Customer
              </Link>
            </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="shadow-card hover:shadow-hover transition-smooth">
              <CardContent className="flex items-center p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalCount}</p>
                  <p className="text-sm text-muted-foreground">Total Customers</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card hover:shadow-hover transition-smooth">
              <CardContent className="flex items-center p-6">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{customers.length}</p>
                  <p className="text-sm text-muted-foreground">Showing</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card hover:shadow-hover transition-smooth">
              <CardContent className="flex items-center p-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalPages}</p>
                  <p className="text-sm text-muted-foreground">Pages</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="shadow-card animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2">
                  Active
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search-city">City</Label>
                <Input
                  id="search-city"
                  placeholder="Search by city"
                  value={filters.city}
                  onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                  className="transition-smooth"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="search-state">State</Label>
                <Input
                  id="search-state"
                  placeholder="Search by state"
                  value={filters.state}
                  onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value }))}
                  className="transition-smooth"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="search-pincode">Pincode</Label>
                <Input
                  id="search-pincode"
                  placeholder="Search by pincode"
                  value={filters.pincode}
                  onChange={(e) => setFilters(prev => ({ ...prev, pincode: e.target.value }))}
                  className="transition-smooth"
                />
              </div>
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <div className="flex gap-2">
                  <LoadingButton onClick={handleSearch} className="flex-1">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </LoadingButton>
                  <Button variant="outline" onClick={handleClearFilters}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Table */}
        <Card className="mt-6 shadow-card">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : customers.length === 0 ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {hasActiveFilters ? 'No customers found' : 'No customers yet'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {hasActiveFilters 
                    ? 'Try adjusting your search criteria' 
                    : 'Get started by adding your first customer'
                  }
                </p>
                <Button asChild>
                  <Link to="/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer, index) => (
                      <TableRow 
                        key={customer.id} 
                        className="hover:bg-muted/50 transition-colors animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">
                                {customer.first_name?.[0]}{customer.last_name?.[0]}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">
                                {customer.first_name} {customer.last_name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ID: {customer.id.slice(0, 8)}...
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            {customer.phone && (
                              <p className="flex items-center text-sm">
                                <Phone className="h-3 w-3 mr-1" />
                                {customer.phone}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span>
                              {[customer.city, customer.state, customer.pincode]
                                .filter(Boolean)
                                .join(', ') || 'No location'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/customers/${customer.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/edit/${customer.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleDeleteClick(
                                  customer.id,
                                  `${customer.first_name} ${customer.last_name}`
                                )
                              }
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="p-6 border-t">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => page > 1 && handlePageChange(page - 1)}
                            className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(pageNum => {
                            if (totalPages <= 7) return true;
                            if (pageNum === 1 || pageNum === totalPages) return true;
                            if (Math.abs(pageNum - page) <= 1) return true;
                            return false;
                          })
                          .map((pageNum, index, array) => {
                            const prev = array[index - 1];
                            const shouldShowEllipsis = prev && pageNum - prev > 1;
                            
                            return (
                              <div key={pageNum} className="flex items-center">
                                {shouldShowEllipsis && (
                                  <PaginationItem>
                                    <PaginationEllipsis />
                                  </PaginationItem>
                                )}
                                <PaginationItem>
                                  <PaginationLink
                                    onClick={() => handlePageChange(pageNum)}
                                    isActive={pageNum === page}
                                    className="cursor-pointer"
                                  >
                                    {pageNum}
                                  </PaginationLink>
                                </PaginationItem>
                              </div>
                            );
                          })}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => page < totalPages && handlePageChange(page + 1)}
                            className={page >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open })}
        title="Delete Customer"
        description={`Are you sure you want to delete ${deleteDialog.customer?.name}? This action cannot be undone.`}
        confirmText={deleteLoading ? 'Deleting...' : 'Delete'}
        onConfirm={handleDeleteConfirm}
        variant="destructive"
      />
    </div>
  );
};

export default CustomerList;