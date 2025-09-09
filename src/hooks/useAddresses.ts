import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Address, AddressFormData } from '@/types/address';
import { useToast } from '@/hooks/use-toast';

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchAddresses = async (customerId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch addresses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createAddress = async (customerId: string, addressData: AddressFormData) => {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .insert([{ ...addressData, customer_id: customerId }])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Address created successfully",
      });
      
      await fetchAddresses(customerId);
      return data;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create address",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateAddress = async (id: string, customerId: string, addressData: AddressFormData) => {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .update(addressData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Address updated successfully",
      });
      
      await fetchAddresses(customerId);
      return data;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update address",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteAddress = async (id: string, customerId: string) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Address deleted successfully",
      });
      
      await fetchAddresses(customerId);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete address",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    addresses,
    loading,
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
  };
};