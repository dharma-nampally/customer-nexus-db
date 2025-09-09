-- Remove dangerous public access policies
DROP POLICY IF EXISTS "Allow public access to customers" ON public.customers;
DROP POLICY IF EXISTS "Allow public access to addresses" ON public.addresses;

-- Create secure RLS policies that require authentication
-- Only authenticated users can manage customers
CREATE POLICY "Authenticated users can view customers" 
ON public.customers 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create customers" 
ON public.customers 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update customers" 
ON public.customers 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete customers" 
ON public.customers 
FOR DELETE 
TO authenticated
USING (true);

-- Apply same secure policies to addresses table
CREATE POLICY "Authenticated users can view addresses" 
ON public.addresses 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create addresses" 
ON public.addresses 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update addresses" 
ON public.addresses 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete addresses" 
ON public.addresses 
FOR DELETE 
TO authenticated
USING (true);