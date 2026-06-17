export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // ফ্রন্টএন্ড থেকে সার্চ কিওয়ার্ড এবং কান্ট্রি কোড নেওয়া
  const { query, country } = req.body || {};

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  // এপিআই ইউআরএল তৈরি (ডিফল্ট কান্ট্রি BD দেওয়া হয়েছে)
  const targetCountry = country || 'BD';
  const apiUrl = `https://facebook-scraper3.p.rapidapi.com/ads/autocomplete?query=${encodeURIComponent(query)}&country=${targetCountry}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY, // Vercel-এর Environment Variable থেকে কী নিবে
        'x-rapidapi-host': 'facebook-scraper3.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
