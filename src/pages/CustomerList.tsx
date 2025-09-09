import { useState, useEffect } from 'react';
import { useCustomers } from '@/hooks/useCustomers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Eye, Edit, Trash2, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

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

  const { customers, loading, totalCount, totalPages, fetchCustomers, deleteCustomer } = useCustomers({
    page,
    limit: 10,
    filters: searchFilters,
  });

  useEffect(() => {
    fetchCustomers();
  }, [page, searchFilters, fetchCustomers]);

  const handleSearch = () => {
    setSearchFilters(filters);
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ city: '', state: '', pincode: '' });
    setSearchFilters({ city: '', state: '', pincode: '' });
    setPage(1);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      await deleteCustomer(id);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Customer List</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Search Filters */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Search Filters</CardTitle>
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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="search-state">State</Label>
                    <Input
                      id="search-state"
                      placeholder="Search by state"
                      value={filters.state}
                      onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="search-pincode">Pincode</Label>
                    <Input
                      id="search-pincode"
                      placeholder="Search by pincode"
                      value={filters.pincode}
                      onChange={(e) => setFilters(prev => ({ ...prev, pincode: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>&nbsp;</Label>
                    <div className="flex space-x-2">
                      <Button onClick={handleSearch} className="flex-1">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                      <Button variant="outline" onClick={handleClearFilters}>
                        <X className="h-4 w-4 mr-2" />
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Summary */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {customers.length} of {totalCount} customers
              </p>
              <Button asChild>
                <Link to="/create">Add New Customer</Link>
              </Button>
            </div>

            {/* Customer Table */}
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : customers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  {Object.values(searchFilters).some(f => f) ? 'No customers found matching your search criteria' : 'No customers found'}
                </p>
                <Button asChild>
                  <Link to="/create">Add Your First Customer</Link>
                </Button>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Pincode</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">
                          {customer.first_name} {customer.last_name}
                        </TableCell>
                        <TableCell>{customer.phone || '-'}</TableCell>
                        <TableCell>{customer.city || '-'}</TableCell>
                        <TableCell>{customer.state || '-'}</TableCell>
                        <TableCell>{customer.pincode || '-'}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
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
                                handleDelete(
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
                  <div className="mt-6 flex items-center justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => page > 1 && handlePageChange(page - 1)}
                            className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                        
                        {/* Page Numbers */}
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
    </div>
  );
};

export default CustomerList;