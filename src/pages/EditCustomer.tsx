import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCustomers } from '@/hooks/useCustomers';
import CustomerForm from '@/components/CustomerForm';
import Navigation from '@/components/Navigation';
import { CustomerFormData, Customer } from '@/types/customer';
import { Skeleton } from '@/components/ui/skeleton';

const EditCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [fetchingCustomer, setFetchingCustomer] = useState(true);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const { updateCustomer, getCustomerById } = useCustomers();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return;
      
      setFetchingCustomer(true);
      const customerData = await getCustomerById(id);
      setCustomer(customerData);
      setFetchingCustomer(false);
    };

    fetchCustomer();
  }, [id, getCustomerById]);

  const handleSubmit = async (data: CustomerFormData) => {
    if (!id) return;
    
    setLoading(true);
    try {
      await updateCustomer(id, data);
      navigate('/customers');
    } catch (error) {
      // Error is handled in the hook
    } finally {
      setLoading(false);
    }
  };

  if (fetchingCustomer) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <Skeleton className="h-8 w-1/3" />
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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-8">
        <CustomerForm
          onSubmit={handleSubmit}
          initialData={{
            first_name: customer.first_name,
            last_name: customer.last_name,
            phone: customer.phone || '',
            city: customer.city || '',
            state: customer.state || '',
            pincode: customer.pincode || '',
          }}
          title="Edit Customer"
          submitText="Update Customer"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EditCustomer;