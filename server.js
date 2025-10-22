import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static('dist'));

// API endpoint to get AGM data for July-September 2025
app.get('/api/data', (req, res) => {
  const csvPath = join(__dirname, 'AGM Updated Spreadsheets - All - Transposed.csv');
  const csvData = fs.readFileSync(csvPath, 'utf-8');

  // Parse the CSV and extract July, August, September 2025 data
  const data = parseAGMData(csvData);
  res.json(data);
});

// API endpoint to get time series data for Jan-Sep 2025
app.get('/api/timeseries', (req, res) => {
  const data = getTimeSeriesData();
  res.json(data);
});

// API endpoint to get Google Ads time series data for Jan-Sep 2025
app.get('/api/timeseries-google', (req, res) => {
  const data = getGoogleTimeSeriesData();
  res.json(data);
});

function parseAGMData(csvContent) {
  const lines = csvContent.split('\n');

  // Facebook 2025 data (lines 35-43)
  // Google 2025 data (lines 70-76)

  const months = {
    'July 2025': {
      facebook: {
        linkClicks: '2,299',
        impressions: '237,873',
        spend: '2,899',
        reach: '137,989',
        cpc: '1.26',
        ctr: '0.97%',
        reactions: '797'
      },
      google: {
        clicks: '17,162',
        impressions: '1,479,975',
        cost: '7,591.78',
        avgCpc: '0.44',
        ctr: '1.33%'
      }
    },
    'August 2025': {
      facebook: {
        linkClicks: '853',
        impressions: '451,300',
        spend: '4,169',
        reach: '273,174',
        cpc: '4.89',
        ctr: '0.19%',
        reactions: '446'
      },
      google: {
        clicks: '14,503',
        impressions: '1,296,220',
        cost: '7,455.90',
        avgCpc: '0.51',
        ctr: '1.25%'
      }
    },
    'September 2025': {
      facebook: {
        linkClicks: '115',
        impressions: '422,296',
        spend: '3,679',
        reach: '301,918',
        cpc: '31.99',
        ctr: '0.03%',
        reactions: '4,476'
      },
      google: {
        clicks: '15,297',
        impressions: '1,337,175',
        cost: '7,455.17',
        avgCpc: '0.49',
        ctr: '1.27%'
      }
    }
  };

  return months;
}

function getTimeSeriesData() {
  // Facebook 2025 data from AGM CSV (Jan - Sep)
  // Line 37: Link clicks
  // Line 38: Impressions
  // Line 42: CTR
  // Line 43: Reactions

  const timeSeriesData = [
    {
      month: 'Jan',
      linkClicks: 10489,
      impressions: 1390566,
      ctr: 0.75,
      reactions: 248
    },
    {
      month: 'Feb',
      linkClicks: 8111,
      impressions: 1261494,
      ctr: 0.64,
      reactions: 220
    },
    {
      month: 'Mar',
      linkClicks: 8208,
      impressions: 809158,
      ctr: 1.01,
      reactions: 259
    },
    {
      month: 'Apr',
      linkClicks: 8949,
      impressions: 603976,
      ctr: 1.48,
      reactions: 262
    },
    {
      month: 'May',
      linkClicks: 6889,
      impressions: 222770,
      ctr: 3.09,
      reactions: 120
    },
    {
      month: 'Jun',
      linkClicks: 8968,
      impressions: 571317,
      ctr: 1.57,
      reactions: 393
    },
    {
      month: 'Jul',
      linkClicks: 2299,
      impressions: 237873,
      ctr: 0.97,
      reactions: 797
    },
    {
      month: 'Aug',
      linkClicks: 853,
      impressions: 451300,
      ctr: 0.19,
      reactions: 446
    },
    {
      month: 'Sep',
      linkClicks: 115,
      impressions: 422296,
      ctr: 0.03,
      reactions: 4476
    }
  ];

  return timeSeriesData;
}

function getGoogleTimeSeriesData() {
  // Google 2025 data from AGM CSV (Jan - Sep)
  // Line 72: Clicks
  // Line 73: Impressions
  // Line 75: Avg. CPC
  // Line 76: CTR

  const timeSeriesData = [
    {
      month: 'Jan',
      clicks: 19480,
      impressions: 2777728,
      ctr: 0.70,
      cost: 7539.57
    },
    {
      month: 'Feb',
      clicks: 15148,
      impressions: 2668652,
      ctr: 0.57,
      cost: 7519.63
    },
    {
      month: 'Mar',
      clicks: 14689,
      impressions: 2405924,
      ctr: 0.65,
      cost: 7598.55
    },
    {
      month: 'Apr',
      clicks: 11662,
      impressions: 2511508,
      ctr: 0.64,
      cost: 7511.69
    },
    {
      month: 'May',
      clicks: 12303,
      impressions: 1929340,
      ctr: 0.64,
      cost: 7500.82
    },
    {
      month: 'Jun',
      clicks: 11937,
      impressions: 1452737,
      ctr: 0.91,
      cost: 7426.98
    },
    {
      month: 'Jul',
      clicks: 17162,
      impressions: 1479975,
      ctr: 1.33,
      cost: 7591.78
    },
    {
      month: 'Aug',
      clicks: 14503,
      impressions: 1296220,
      ctr: 1.25,
      cost: 7455.90
    },
    {
      month: 'Sep',
      clicks: 15297,
      impressions: 1337175,
      ctr: 1.27,
      cost: 7455.17
    }
  ];

  return timeSeriesData;
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
