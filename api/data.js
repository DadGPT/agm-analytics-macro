export default function handler(req, res) {
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

  res.status(200).json(months);
}
