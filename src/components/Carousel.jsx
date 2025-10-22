import { useState } from 'react'
import TimeSeriesChart from './TimeSeriesChart'
import GoogleTimeSeriesChart from './GoogleTimeSeriesChart'
import RSquaredExplainer from './RSquaredExplainer'

function Carousel({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = ['July 2025', 'August 2025', 'September 2025', 'Facebook Trends', 'Google Trends', 'R² Explained']

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const currentMonth = slides[currentSlide]
  const monthData = currentSlide < 3 ? data[currentMonth] : null

  return (
    <div className="relative">
      {/* Carousel Container */}
      {currentSlide === 3 ? (
        // Facebook Time Series Slide
        <TimeSeriesChart />
      ) : currentSlide === 4 ? (
        // Google Time Series Slide
        <GoogleTimeSeriesChart />
      ) : currentSlide === 5 ? (
        // R-Squared Explainer Slide
        <RSquaredExplainer />
      ) : (
        // Monthly Data Slides
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Month Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8 px-12">
            <h2 className="text-6xl font-extrabold text-center">{currentMonth}</h2>
          </div>

          {/* Content */}
          <div className="p-12">
          {/* Facebook Ads Section */}
          <div className="mb-12">
            <div className="bg-blue-600 text-white py-4 px-8 rounded-xl mb-6">
              <h3 className="text-5xl font-bold">Facebook Ads</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <MetricCard
                label="Link Clicks"
                value={monthData.facebook.linkClicks}
                color="blue"
              />
              <MetricCard
                label="Impressions"
                value={monthData.facebook.impressions}
                color="blue"
              />
              <MetricCard
                label="Spend"
                value={`$${monthData.facebook.spend}`}
                color="blue"
              />
              <MetricCard
                label="Reach"
                value={monthData.facebook.reach}
                color="blue"
              />
              <MetricCard
                label="CPC"
                value={`$${monthData.facebook.cpc}`}
                color="blue"
              />
              <MetricCard
                label="CTR"
                value={monthData.facebook.ctr}
                color="blue"
              />
              <MetricCard
                label="Reactions"
                value={monthData.facebook.reactions}
                color="blue"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-4 border-gray-300 my-12"></div>

          {/* Google Ads Section */}
          <div>
            <div className="bg-green-600 text-white py-4 px-8 rounded-xl mb-6">
              <h3 className="text-5xl font-bold">Google Ads</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <MetricCard
                label="Clicks"
                value={monthData.google.clicks}
                color="green"
              />
              <MetricCard
                label="Impressions"
                value={monthData.google.impressions}
                color="green"
              />
              <MetricCard
                label="Cost"
                value={`$${monthData.google.cost}`}
                color="green"
              />
              <MetricCard
                label="Avg CPC"
                value={`$${monthData.google.avgCpc}`}
                color="green"
              />
              <MetricCard
                label="CTR"
                value={monthData.google.ctr}
                color="green"
              />
            </div>
          </div>
        </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-3 pb-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-indigo-600 w-12'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-4 shadow-xl transition-all hover:scale-110"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-4 shadow-xl transition-all hover:scale-110"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

function MetricCard({ label, value, color }) {
  const colorClasses = {
    blue: 'border-blue-200 bg-blue-50',
    green: 'border-green-200 bg-green-50'
  }

  return (
    <div className={`border-4 ${colorClasses[color]} rounded-xl p-6 text-center transition-transform hover:scale-105`}>
      <p className="text-gray-600 font-semibold text-xl mb-2">{label}</p>
      <p className="text-4xl font-extrabold text-gray-900">{value}</p>
    </div>
  )
}

export default Carousel
