import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://vsfdsysdmeclqnvijwzc.supabase.co";
const supabaseKey = "sb_publishable_8CWFvr_10ZPVYGgGlH0hpA_CRYlBh6p";

export const supabase = createClient(supabaseUrl, supabaseKey);
