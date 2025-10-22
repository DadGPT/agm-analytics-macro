// Statistical analysis utilities

/**
 * Calculate linear regression and R-squared value
 * @param {Array} xData - Independent variable data points
 * @param {Array} yData - Dependent variable data points
 * @returns {Object} - { rSquared, slope, intercept, correlation }
 */
export function calculateRegression(xData, yData) {
  const n = xData.length;

  // Calculate means
  const xMean = xData.reduce((a, b) => a + b, 0) / n;
  const yMean = yData.reduce((a, b) => a + b, 0) / n;

  // Calculate slope and intercept
  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < n; i++) {
    numerator += (xData[i] - xMean) * (yData[i] - yMean);
    denominator += Math.pow(xData[i] - xMean, 2);
  }

  const slope = numerator / denominator;
  const intercept = yMean - slope * xMean;

  // Calculate R-squared
  let ssTotal = 0;
  let ssResidual = 0;

  for (let i = 0; i < n; i++) {
    const predicted = slope * xData[i] + intercept;
    ssResidual += Math.pow(yData[i] - predicted, 2);
    ssTotal += Math.pow(yData[i] - yMean, 2);
  }

  const rSquared = 1 - (ssResidual / ssTotal);

  // Calculate Pearson correlation coefficient
  const correlation = Math.sqrt(Math.abs(rSquared)) * Math.sign(slope);

  return {
    rSquared: Math.max(0, Math.min(1, rSquared)), // Clamp between 0 and 1
    slope,
    intercept,
    correlation
  };
}

/**
 * Analyze correlations between all pairs of metrics
 * @param {Array} data - Array of data objects
 * @param {Array} metrics - Array of metric names to analyze
 * @returns {Array} - Array of correlation results
 */
export function analyzeCorrelations(data, metrics) {
  const results = [];

  // Analyze each pair of metrics
  for (let i = 0; i < metrics.length; i++) {
    for (let j = i + 1; j < metrics.length; j++) {
      const metric1 = metrics[i];
      const metric2 = metrics[j];

      const xData = data.map(d => d[metric1.key]);
      const yData = data.map(d => d[metric2.key]);

      const regression = calculateRegression(xData, yData);

      results.push({
        x: metric1.name,
        y: metric2.name,
        rSquared: regression.rSquared,
        correlation: regression.correlation,
        strength: getCorrelationStrength(regression.rSquared),
        direction: regression.slope > 0 ? 'positive' : 'negative'
      });
    }
  }

  // Sort by R-squared value (strongest correlations first)
  return results.sort((a, b) => b.rSquared - a.rSquared);
}

/**
 * Get correlation strength description
 * @param {number} rSquared - R-squared value
 * @returns {string} - Strength description
 */
function getCorrelationStrength(rSquared) {
  if (rSquared >= 0.8) return 'Very Strong';
  if (rSquared >= 0.6) return 'Strong';
  if (rSquared >= 0.4) return 'Moderate';
  if (rSquared >= 0.2) return 'Weak';
  return 'Very Weak';
}

/**
 * Format R-squared value as percentage
 * @param {number} rSquared - R-squared value
 * @returns {string} - Formatted percentage
 */
export function formatRSquared(rSquared) {
  return `${(rSquared * 100).toFixed(1)}%`;
}
