export default function handler(req, res) {
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

  res.status(200).json(timeSeriesData);
}
