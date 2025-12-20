import dbConnect from '../../lib/mongodb';
import { AllSummary } from '../../models/CovidData';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await dbConnect();

    if (req.method === 'GET') {
      const data = await AllSummary.findOne().sort({ _id: -1 });
      if (!data) {
        return res.status(404).json({ error: 'No summary data found' });
      }
      // Return data wrapped in the expected key format
      res.status(200).json({ allSummary: data });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}