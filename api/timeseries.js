export default function handler(req, res) {
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

  res.status(200).json(timeSeriesData);
}
