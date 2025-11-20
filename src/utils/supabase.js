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

// src/utils/supabase.js (ADD THIS FUNCTION)

// ... existing functions (fetchMaintenanceRequests, updateRequestStatus) ...

/**
 * Updates user profile data (name and room) in the profiles table.
 * @param {string} userId - The ID of the user to update.
 * @param {object} updates - Object containing fields to update (e.g., { full_name: 'New Name', room: 'B101' }).
 */
export async function updateProfile(userId, updates) {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (error) {
    console.error('Error updating profile:', error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

/**
 * Updates the user's password using Supabase Auth.
 * @param {string} newPassword - The new password.
 */
export async function updatePassword(newPassword) {
  // Note: Supabase requires the user to be recently signed in for this to work.
  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    console.error('Error updating password:', error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

// Ensure you export the new functions
// export { supabase, fetchMaintenanceRequests, updateRequestStatus, updateProfile, updatePassword };
