import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, Eye, LogIn, Sparkles, TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Modern Customer Management
          </div>
          <h1 className="text-5xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
            Customer Address Manager
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Streamline your customer data management with our intuitive, modern platform. 
            Built for efficiency and designed for scale.
          </p>
          {!user && (
            <Button size="lg" asChild className="shadow-elegant animate-scale-in">
              <Link to="/auth">
                <LogIn className="mr-2 h-5 w-5" />
                Sign In to Get Started
              </Link>
            </Button>
          )}
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="shadow-card hover:shadow-hover transition-smooth border-0 group animate-slide-up">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl mb-2">Manage Customers</CardTitle>
              <p className="text-muted-foreground text-sm">
                View, search, and organize all your customers with advanced filtering and sorting options
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <Button asChild className="w-full shadow-card" variant="outline">
                <Link to="/customers">
                  <Eye className="mr-2 h-4 w-4" />
                  View All Customers
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-hover transition-smooth border-0 group animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl mb-2">Add New Customer</CardTitle>
              <p className="text-muted-foreground text-sm">
                Create comprehensive customer profiles with contact details and location information
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <Button asChild className="w-full">
                <Link to="/create">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add New Customer
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-hover transition-smooth border-0 group animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl mb-2">Analytics & Insights</CardTitle>
              <p className="text-muted-foreground text-sm">
                Get valuable insights about your customer database with detailed statistics and trends
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="outline" asChild className="w-full shadow-card">
                <Link to="/customers">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Statistics
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features Section */}
        <div className="mt-20 text-center animate-fade-in">
          <h2 className="text-3xl font-bold mb-8">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 rounded-full bg-success"></div>
              </div>
              <h3 className="font-semibold mb-2">Intuitive Design</h3>
              <p className="text-sm text-muted-foreground">Clean, modern interface that's easy to navigate</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 rounded-full bg-primary"></div>
              </div>
              <h3 className="font-semibold mb-2">Fast Performance</h3>
              <p className="text-sm text-muted-foreground">Lightning-fast search and filtering capabilities</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 rounded-full bg-accent"></div>
              </div>
              <h3 className="font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-sm text-muted-foreground">Your data is protected with enterprise-grade security</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 rounded-full bg-warning"></div>
              </div>
              <h3 className="font-semibold mb-2">Mobile Ready</h3>
              <p className="text-sm text-muted-foreground">Fully responsive design works on all devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
