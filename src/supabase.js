import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://ojwmmgaresomlrxdmmto.supabase.co"
const supabaseKey = "sb_publishable_TSGqAv9_2HImOW1z65Nzsw_GL7ed-PK"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)