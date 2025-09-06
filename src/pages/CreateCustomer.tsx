import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '@/hooks/useCustomers';
import CustomerForm from '@/components/CustomerForm';
import Navigation from '@/components/Navigation';
import { CustomerFormData } from '@/types/customer';

const CreateCustomer = () => {
  const [loading, setLoading] = useState(false);
  const { createCustomer } = useCustomers();
  const navigate = useNavigate();

  const handleSubmit = async (data: CustomerFormData) => {
    setLoading(true);
    try {
      await createCustomer(data);
      navigate('/customers');
    } catch (error) {
      // Error is handled in the hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-8">
        <CustomerForm
          onSubmit={handleSubmit}
          title="Create New Customer"
          submitText="Create Customer"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CreateCustomer;