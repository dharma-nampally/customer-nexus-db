import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCustomers } from '@/hooks/useCustomers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Navigation from '@/components/Navigation';
import { Customer } from '@/types/customer';
import { Edit, ArrowLeft, Phone, MapPin } from 'lucide-react';

const CustomerProfile = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const { getCustomerById } = useCustomers();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return;
      
      setLoading(true);
      const customerData = await getCustomerById(id);
      setCustomer(customerData);
      setLoading(false);
    };

    fetchCustomer();
  }, [id, getCustomerById]);

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <CardTitle>Location Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(customer.city || customer.state || customer.pincode) ? (
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <div className="space-y-1">
                      {customer.city && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">City</p>
                          <Badge variant="secondary">{customer.city}</Badge>
                        </div>
                      )}
                      {customer.state && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">State</p>
                          <Badge variant="secondary">{customer.state}</Badge>
                        </div>
                      )}
                      {customer.pincode && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Pincode</p>
                          <Badge variant="secondary">{customer.pincode}</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No location details available</p>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Created At</p>
                    <p>{new Date(customer.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                    <p>{new Date(customer.updated_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;