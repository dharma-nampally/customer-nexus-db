import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCustomers } from '@/hooks/useCustomers';
import { useAddresses } from '@/hooks/useAddresses';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Navigation from '@/components/Navigation';
import AddressForm from '@/components/AddressForm';
import { Customer } from '@/types/customer';
import { Address, AddressFormData } from '@/types/address';
import { Edit, ArrowLeft, Phone, MapPin, Plus, Edit2, Trash2 } from 'lucide-react';

const CustomerProfile = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [addressFormOpen, setAddressFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressLoading, setAddressLoading] = useState(false);
  
  const { getCustomerById } = useCustomers();
  const { addresses, loading: addressesLoading, fetchAddresses, createAddress, updateAddress, deleteAddress } = useAddresses();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return;
      
      setLoading(true);
      const customerData = await getCustomerById(id);
      setCustomer(customerData);
      setLoading(false);

      if (customerData) {
        await fetchAddresses(id);
      }
    };

    fetchCustomer();
  }, [id, getCustomerById, fetchAddresses]);

  const handleAddAddress = async (data: AddressFormData) => {
    if (!id) return;
    setAddressLoading(true);
    try {
      await createAddress(id, data);
      setAddressFormOpen(false);
    } catch (error) {
      // Error handled in hook
    } finally {
      setAddressLoading(false);
    }
  };

  const handleEditAddress = async (data: AddressFormData) => {
    if (!id || !editingAddress) return;
    setAddressLoading(true);
    try {
      await updateAddress(editingAddress.id, id, data);
      setEditingAddress(null);
    } catch (error) {
      // Error handled in hook
    } finally {
      setAddressLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this address?')) {
      await deleteAddress(addressId, id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive">Customer Not Found</h1>
            <p className="text-muted-foreground mt-2">
              The customer you're looking for doesn't exist.
            </p>
            <Button asChild className="mt-4">
              <Link to="/customers">Back to Customers</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/customers">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Customers
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">
                {customer.first_name} {customer.last_name}
              </h1>
            </div>
            <Button asChild>
              <Link to={`/edit/${customer.id}`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Customer
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p className="text-lg font-semibold">
                    {customer.first_name} {customer.last_name}
                  </p>
                </div>
                
                {customer.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <p>{customer.phone}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Created At</p>
                  <p>{new Date(customer.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                  <p>{new Date(customer.updated_at).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Addresses Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CardTitle>Addresses</CardTitle>
                  {addresses.length === 1 && (
                    <Badge variant="outline" className="text-xs">
                      Only One Address
                    </Badge>
                  )}
                </div>
                <Button onClick={() => setAddressFormOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {addressesLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No addresses found</p>
                  <Button onClick={() => setAddressFormOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Address
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Address</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Pincode</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {addresses.map((address) => (
                      <TableRow key={address.id}>
                        <TableCell className="font-medium max-w-xs">
                          <p className="truncate">{address.address_line}</p>
                        </TableCell>
                        <TableCell>{address.city}</TableCell>
                        <TableCell>{address.state}</TableCell>
                        <TableCell>{address.pincode}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setEditingAddress(address)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Address Form */}
      <AddressForm
        open={addressFormOpen}
        onOpenChange={setAddressFormOpen}
        onSubmit={handleAddAddress}
        title="Add New Address"
        submitText="Add Address"
        loading={addressLoading}
      />

      {/* Edit Address Form */}
      <AddressForm
        open={!!editingAddress}
        onOpenChange={(open) => !open && setEditingAddress(null)}
        onSubmit={handleEditAddress}
        initialData={editingAddress ? {
          address_line: editingAddress.address_line,
          city: editingAddress.city,
          state: editingAddress.state,
          pincode: editingAddress.pincode,
        } : undefined}
        title="Edit Address"
        submitText="Update Address"
        loading={addressLoading}
      />
    </div>
  );
};

export default CustomerProfile;