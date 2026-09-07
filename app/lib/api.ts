const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8000";

export type Ad = {
  id: number;
  description: string;
  category: string | null;
  price: number | null;
  channel_url: string;
  created_at: string;
};

export type Stats = {
  active_ads: number;
  sold_via_channel: number;
  channel_url: string;
};

export async function getAds(limit = 24): Promise<Ad[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/ads?limit=${limit}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.ads ?? [];
  } catch {
    return [];
  }
}

export async function getStats(): Promise<Stats | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/stats`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
