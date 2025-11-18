import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ugbu************qpyycr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  // 1. Sign in as student
  const { data: studentSession, error: studentError } = await supabase.auth.signInWithPassword({
    email: 'student@example.com',
    password: 'student'
  });

  if (studentError) return console.error('Student login failed:', studentError);

  // Create a client with student session
  const studentClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${studentSession.session.access_token}` } }
  });

  // 2. Insert maintenance request as student
  const { data: insertData, error: insertError } = await studentClient
    .from('maintenance_requests')
    .insert([{
      student_id: studentSession.user.id,
      category: 'Electrical',
      room: '12A',
      description: 'Light not working'
    }]);
  console.log('Insert:', insertData, insertError);

  // 3. Sign in as admin
  const { data: adminSession, error: adminError } = await supabase.auth.signInWithPassword({
    email: 'ronniiiip@gmail.com',
    password: 'ronron19'
  });

  if (adminError) return console.error('Admin login failed:', adminError);

  // Create a client with admin session
  const adminClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${adminSession.session.access_token}` } }
  });

  // 4. Admin selects all requests
  const { data: allRequests, error: selectError } = await adminClient
    .from('maintenance_requests')
    .select('*');
  console.log('Admin select:', allRequests, selectError);
}

test();