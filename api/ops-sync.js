// Vercel Serverless Function: Operations Portal Cloud Sync
// Syncs fleet operations bookings and vehicle locations across mobile & desktop devices
// High-capacity persistence backed by MantleDB (10,000 requests/day, zero rate-limit blocks)

const CLOUD_STORE_URL = "https://mantledb.sh/v2/bikeatrent-siliguri-ops-v1/state";

export default async function handler(req, res) {
  // Set CORS and strict zero-cache headers for instant cross-device mobile sync
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Cache-Control, Pragma');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const resp = await fetch(CLOUD_STORE_URL, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'BikeAtRent-Ops-Server/1.0',
          'Cache-Control': 'no-cache'
        }
      });
      if (!resp.ok) {
        return res.status(resp.status).json({ error: 'Failed to fetch cloud sync data' });
      }
      const data = await resp.json();
      return res.status(200).json(data || { bookings: [], fleet_locations: {} });
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const bookings = payload.bookings || [];
      const fleet_locations = payload.fleet_locations || {};
      const last_updated = new Date().toISOString();

      const updateResp = await fetch(CLOUD_STORE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'BikeAtRent-Ops-Server/1.0'
        },
        body: JSON.stringify({
          bookings,
          fleet_locations,
          last_updated
        })
      });

      if (!updateResp.ok) {
        return res.status(updateResp.status).json({ error: 'Failed to update cloud sync data' });
      }
      return res.status(200).json({ success: true, count: bookings.length, last_updated });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
