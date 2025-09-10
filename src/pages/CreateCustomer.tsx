import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '@/hooks/useCustomers';
import CustomerForm from '@/components/CustomerForm';
import Navigation from '@/components/Navigation';
import { CustomerFormData } from '@/types/customer';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 animate-fade-in">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/customers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Customers
            </Link>
          </Button>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/customers" className="hover:text-foreground transition-colors">Customers</Link>
            <span>/</span>
            <span className="text-foreground">Create New</span>
          </div>
        </div>

        <div className="animate-slide-up">
          <CustomerForm
            onSubmit={handleSubmit}
            title="Create New Customer"
            submitText="Create Customer"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;