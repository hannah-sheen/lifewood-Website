import { supabase } from '../../lib/supabase';

// Fetch all positions
export async function fetchPositions() {
  const { data, error } = await supabase
    .from('position')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) throw new Error(error.message);
  
  return data;
}

// Fetch only active positions (not archived)
export async function fetchActivePositions() {
  const { data, error } = await supabase
    .from('position')
    .select('*')
    .eq('is_archive', false)
    .order('id', { ascending: true });
  
  if (error) throw new Error(error.message);
  return data;
}

// Fetch single position by id
export async function fetchPositionById(id: number) {
  const { data, error } = await supabase
    .from('position')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(error.message);
  return data;
}

// Add new position
export async function addPosition(title: string, description: string, status: string = 'active') {
  const { data, error } = await supabase
    .from('position')
    .insert([{ 
      title, 
      description, 
      status,
      is_archive: false 
    }])
    .select();
  
  if (error) throw new Error(error.message);
  return data[0];
}

// Update position
export async function updatePosition(id: number, updates: {
  title?: string;
  description?: string;
  status?: string;
  is_archive?: boolean;
}) {
  const { data, error } = await supabase
    .from('position')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) throw new Error(error.message);
  return data[0];
}

// Delete position (permanent)
export async function deletePosition(id: number) {
  const { error } = await supabase
    .from('position')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(error.message);
  return { success: true };
}

// Archive position (soft delete)
export async function archivePosition(id: number) {
  const { data, error } = await supabase
    .from('position')
    .update({ is_archive: true })
    .eq('id', id)
    .select();
  
  if (error) throw new Error(error.message);
  return data[0];
}

// Restore position from archive
export async function restorePosition(id: number) {
  const { data, error } = await supabase
    .from('position')
    .update({ is_archive: false })
    .eq('id', id)
    .select();
  
  if (error) throw new Error(error.message);
  return data[0];
}