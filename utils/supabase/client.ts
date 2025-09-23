// Safe Supabase configuration that works in all environments
const FALLBACK_URL = "https://mkknfgjcrvzklfqfuvjb.supabase.co";
const FALLBACK_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ra25mZ2pjcnZ6a2xmcWZ1dmpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1ODc3OTEsImV4cCI6MjA3NDE2Mzc5MX0.lJ3Sz0OL3XJi6iC7q1-yLKMADqVGTJ0TJirZP60PpuI";

const getSupabaseUrl = () => {
  // Safe access to import.meta.env
  try {
    return (typeof import !== 'undefined' && 
            import.meta && 
            import.meta.env && 
            import.meta.env.VITE_SUPABASE_URL) || FALLBACK_URL;
  } catch {
    return FALLBACK_URL;
  }
};

const getSupabaseAnonKey = () => {
  // Safe access to import.meta.env
  try {
    return (typeof import !== 'undefined' && 
            import.meta && 
            import.meta.env && 
            import.meta.env.VITE_SUPABASE_ANON_KEY) || FALLBACK_ANON_KEY;
  } catch {
    return FALLBACK_ANON_KEY;
  }
};

export const supabaseConfig = {
  url: getSupabaseUrl(),
  anonKey: getSupabaseAnonKey(),
  projectId: "mkknfgjcrvzklfqfuvjb"
};

export const projectId = supabaseConfig.projectId;
export const publicAnonKey = supabaseConfig.anonKey;
