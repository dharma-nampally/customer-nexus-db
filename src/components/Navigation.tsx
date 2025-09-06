import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, UserPlus } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-card border-b border-border px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl font-bold text-primary">
            Customer Manager
          </Link>
          <div className="flex space-x-4">
            <Button
              variant={location.pathname === '/customers' ? 'default' : 'ghost'}
              asChild
            >
              <Link to="/customers">
                <Users className="mr-2 h-4 w-4" />
                Customers
              </Link>
            </Button>
            <Button
              variant={location.pathname === '/create' ? 'default' : 'ghost'}
              asChild
            >
              <Link to="/create">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Customer
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;