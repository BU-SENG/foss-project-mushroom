import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing required Supabase environment variables');
}
export const supabase = createClient(supabaseUrl, supabaseKey);





export async function fetchMaintenanceRequests(studentId = null) {
  let query = supabase.from('maintenance_requests').select(`
    id, 
    created_at, 
    category, 
    room, 
    description, 
    status, 
    student_id,
    profiles!maintenance_requests_student_id_fkey(full_name) 
  `);

  if (studentId) {

    query = query.eq('student_id', studentId);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching maintenance requests:', error);
    return [];
  }


  return data.map(request => ({
    ...request,


    requester_name: request.profiles?.full_name || 'N/A'
  }));
}

/**
 * Updates the status of a specific maintenance request.
 * @param {string} requestId 
 * @param {string} newStatus 
 */
export async function updateRequestStatus(requestId, newStatus) {
  const { error } = await supabase
    .from('maintenance_requests')
    .update({ status: newStatus })
    .eq('id', requestId);

  if (error) {
    console.error('Error updating request status:', error);
    return { success: false, error: error.message };
  }
  return { success: true };
}


