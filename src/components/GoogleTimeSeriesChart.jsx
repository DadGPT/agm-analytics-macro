import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { analyzeCorrelations, formatRSquared } from '../utils/statistics'

function GoogleTimeSeriesChart() {
  const [data, setData] = useState([])
  const [visibleLines, setVisibleLines] = useState(0)
  const [loading, setLoading] = useState(true)
  const [correlations, setCorrelations] = useState([])

  useEffect(() => {
    fetch('/api/timeseries-google')
      .then(res => res.json())
      .then(data => {
        setData(data)

        // Calculate correlations
        const correlationResults = analyzeCorrelations(data, lines)
        setCorrelations(correlationResults)

        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading Google time series data:', err)
        setLoading(false)
      })
  }, [])

  const progressAnimation = () => {
    if (visibleLines < 3) {
      setVisibleLines(visibleLines + 1)
    } else {
      // Reset to show all animations again
      setVisibleLines(0)
      setTimeout(() => setVisibleLines(1), 100)
    }
  }

  const lines = [
    {
      key: 'clicks',
      name: 'Clicks',
      color: '#10b981',
      yAxisId: 'left',
      strokeWidth: 3
    },
    {
      key: 'impressions',
      name: 'Impressions',
      color: '#3b82f6',
      yAxisId: 'left',
      strokeWidth: 3
    },
    {
      key: 'ctr',
      name: 'CTR (%)',
      color: '#8b5cf6',
      yAxisId: 'right',
      strokeWidth: 3
    }
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border-2 border-green-200">
          <p className="font-bold text-lg mb-2">{label} 2025</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="font-semibold">
              {entry.name}: {entry.value.toLocaleString()}
              {entry.name === 'CTR (%)' ? '%' : ''}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-white text-4xl font-bold">Loading chart...</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-6 px-8 rounded-xl mb-8 -mt-12 -mx-12">
        <h2 className="text-6xl font-extrabold text-center">2025 Google Ads Trends</h2>
        <p className="text-2xl text-center mt-2 opacity-90">January - September</p>
      </div>

      {/* Chart */}
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 80, left: 80, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 18, fontWeight: 'bold' }}
              stroke="#6b7280"
            />
            <YAxis
              yAxisId="left"
              scale="log"
              domain={['auto', 'auto']}
              tick={{ fontSize: 16, fontWeight: 'bold' }}
              stroke="#6b7280"
              label={{ value: 'Clicks & Impressions (Log Scale)', angle: -90, position: 'insideLeft', style: { fontSize: 18, fontWeight: 'bold' } }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              scale="log"
              domain={['auto', 'auto']}
              tick={{ fontSize: 16, fontWeight: 'bold' }}
              stroke="#6b7280"
              label={{ value: 'CTR (%) (Log Scale)', angle: 90, position: 'insideRight', style: { fontSize: 18, fontWeight: 'bold' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '20px', fontWeight: 'bold' }}
              iconType="line"
            />

            {visibleLines >= 1 && (
              <Line
                type="monotone"
                dataKey={lines[0].key}
                name={lines[0].name}
                stroke={lines[0].color}
                strokeWidth={lines[0].strokeWidth}
                yAxisId={lines[0].yAxisId}
                dot={{ fill: lines[0].color, r: 6 }}
                activeDot={{ r: 8 }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            )}

            {visibleLines >= 2 && (
              <Line
                type="monotone"
                dataKey={lines[1].key}
                name={lines[1].name}
                stroke={lines[1].color}
                strokeWidth={lines[1].strokeWidth}
                yAxisId={lines[1].yAxisId}
                dot={{ fill: lines[1].color, r: 6 }}
                activeDot={{ r: 8 }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            )}

            {visibleLines >= 3 && (
              <Line
                type="monotone"
                dataKey={lines[2].key}
                name={lines[2].name}
                stroke={lines[2].color}
                strokeWidth={lines[2].strokeWidth}
                yAxisId={lines[2].yAxisId}
                dot={{ fill: lines[2].color, r: 6 }}
                activeDot={{ r: 8 }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Progress Button */}
      <div className="flex justify-center items-center gap-6">
        <button
          onClick={progressAnimation}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-12 rounded-full text-3xl shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          {visibleLines === 0 ? 'Start Animation' : visibleLines === 3 ? 'Restart' : 'Next Metric'}
        </button>

        {/* Progress Indicators */}
        <div className="flex gap-3">
          {lines.map((line, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full transition-all ${
                index < visibleLines ? 'scale-100 opacity-100' : 'scale-75 opacity-30'
              }`}
              style={{ backgroundColor: index < visibleLines ? line.color : '#d1d5db' }}
            />
          ))}
        </div>
      </div>

      {/* Current Metric Display */}
      {visibleLines > 0 && (
        <div className="mt-8 text-center">
          <p className="text-2xl font-bold text-gray-700">
            Now showing: <span style={{ color: lines[visibleLines - 1].color }}>
              {lines[visibleLines - 1].name}
            </span>
          </p>
        </div>
      )}

      {/* R-Squared Analysis */}
      {correlations.length > 0 && (
        <div className="mt-12 border-t-4 border-green-200 pt-8">
          <h3 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
            Regression Analysis (R² Values)
          </h3>
          <p className="text-lg text-gray-600 text-center mb-6">
            R² indicates how much variance in one metric is explained by another (0% = no relationship, 100% = perfect relationship)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {correlations.map((corr, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border-4 ${
                  corr.rSquared >= 0.6
                    ? 'bg-green-50 border-green-300'
                    : corr.rSquared >= 0.4
                    ? 'bg-yellow-50 border-yellow-300'
                    : 'bg-gray-50 border-gray-300'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-bold text-gray-800">
                    {corr.x} vs {corr.y}
                  </span>
                  <span
                    className={`text-2xl font-extrabold ${
                      corr.rSquared >= 0.6
                        ? 'text-green-700'
                        : corr.rSquared >= 0.4
                        ? 'text-yellow-700'
                        : 'text-gray-700'
                    }`}
                  >
                    R² = {formatRSquared(corr.rSquared)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {corr.strength} {corr.direction} correlation
                  </span>
                  <span className="text-gray-500">
                    r = {corr.correlation.toFixed(3)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Note: Correlation does not imply causation. These values show statistical relationships, not causal effects.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default GoogleTimeSeriesChart
