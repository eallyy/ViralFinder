"use server";
import { createClient } from '@/utils/supabase/server'
import { createServerAdminClient } from '@/utils/supabase/server';

// Get reels (Admin version)
export const getWinnerReels = async (limit: number = 24, offset: number = 0) => {
  const supabase = createServerAdminClient();

  const { data: reels, error } = await supabase
    .from("winner_reels")
    .select("*")
    .order("uploaded_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error || !reels) return [];

  const usernames = reels.map((reel) => reel.username);
  const { data: adAccounts } = await supabase
    .from("ad_library_accounts")
    .select("username, active_ads, link")
    .in("username", usernames);

  const adMap = new Map(
    (adAccounts || [])
      .filter((acc) => acc.active_ads > 0)
      .map((acc) => [acc.username, { active_ads: acc.active_ads, link: acc.link }])
  );

  const enrichedReels = reels.map((reel) => {
    const adInfo = adMap.get(reel.username);
    return adInfo
      ? { ...reel, active_ads: adInfo.active_ads, ad_library_link: adInfo.link }
      : reel;
  });

  return enrichedReels;
};

// Get reels (Client version)
export const getWinnerReelsClientWithCount = async (limit = 24, offset = 0) => {
  const supabase = await createClient();

  const { data: reels, error, count } = await supabase
    .from("winner_reels")
    .select("*", { count: "exact", head: false })
    .order("uploaded_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error || !reels) {
    console.error("Supabase error:", error.message);
    return { data: [], count: 0 };
  }

  const usernames = reels.map((reel) => reel.username);
  const { data: adAccounts } = await supabase
    .from("ad_library_accounts")
    .select("username, active_ads, link")
    .in("username", usernames);

  const adMap = new Map(
    (adAccounts || [])
      .filter((acc) => acc.active_ads > 0)
      .map((acc) => [acc.username, { active_ads: acc.active_ads, link: acc.link }])
  );

  const enrichedReels = reels.map((reel) => {
    const adInfo = adMap.get(reel.username);
    return adInfo
      ? { ...reel, active_ads: adInfo.active_ads, ad_library_link: adInfo.link }
      : reel;
  });

  return { data: enrichedReels, count: count ?? 0 };
};
