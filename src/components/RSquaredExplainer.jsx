function RSquaredExplainer() {
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 px-8 rounded-xl mb-8 -mt-12 -mx-12">
        <h2 className="text-6xl font-extrabold text-center">Understanding R² (R-Squared)</h2>
        <p className="text-2xl text-center mt-2 opacity-90">How Well Does One Thing Predict Another?</p>
      </div>

      {/* What is R-Squared? */}
      <div className="mb-12">
        <h3 className="text-5xl font-bold text-gray-800 mb-6">What is R²?</h3>
        <div className="bg-blue-50 border-4 border-blue-200 rounded-xl p-8">
          <p className="text-3xl text-gray-700 leading-relaxed">
            R² tells you <span className="font-extrabold text-blue-700">how much of the change</span> in one thing
            is explained by changes in another thing.
          </p>
        </div>
      </div>

      {/* Simple Analogy */}
      <div className="mb-12">
        <h3 className="text-5xl font-bold text-gray-800 mb-6">Think of it Like This:</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-green-50 border-4 border-green-300 rounded-xl p-6 text-center">
            <div className="text-6xl font-extrabold text-green-700 mb-4">100%</div>
            <p className="text-2xl text-gray-700">
              <span className="font-bold">Perfect match!</span><br/>
              One thing completely predicts the other
            </p>
          </div>
          <div className="bg-yellow-50 border-4 border-yellow-300 rounded-xl p-6 text-center">
            <div className="text-6xl font-extrabold text-yellow-700 mb-4">50%</div>
            <p className="text-2xl text-gray-700">
              <span className="font-bold">Half explained</span><br/>
              Some relationship, but other factors matter too
            </p>
          </div>
          <div className="bg-gray-50 border-4 border-gray-300 rounded-xl p-6 text-center">
            <div className="text-6xl font-extrabold text-gray-700 mb-4">0%</div>
            <p className="text-2xl text-gray-700">
              <span className="font-bold">No relationship</span><br/>
              They're totally independent
            </p>
          </div>
        </div>
      </div>

      {/* The Formula */}
      <div className="mb-12">
        <h3 className="text-5xl font-bold text-gray-800 mb-6 text-center">The Formula:</h3>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-4 border-purple-300 rounded-xl p-12">
          <div className="text-center mb-8">
            <div className="text-7xl font-extrabold text-purple-700 mb-4">
              R² = 1 - (SS<sub className="text-5xl">res</sub> / SS<sub className="text-5xl">tot</sub>)
            </div>
          </div>

          {/* Formula Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-xl p-6 border-4 border-red-200">
              <div className="text-4xl font-extrabold text-red-700 mb-3">
                SS<sub>res</sub> = Residual Error
              </div>
              <p className="text-2xl text-gray-700">
                How far off your predictions are from reality
              </p>
              <p className="text-xl text-gray-600 mt-2">
                (Think: "mistakes made")
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-4 border-blue-200">
              <div className="text-4xl font-extrabold text-blue-700 mb-3">
                SS<sub>tot</sub> = Total Variance
              </div>
              <p className="text-2xl text-gray-700">
                How spread out the data is overall
              </p>
              <p className="text-xl text-gray-600 mt-2">
                (Think: "total wiggle room")
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step by Step */}
      <div className="mb-12">
        <h3 className="text-5xl font-bold text-gray-800 mb-6">Breaking it Down:</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 border-l-8 border-blue-500 p-6 rounded-r-xl">
            <div className="text-3xl font-bold text-blue-800 mb-2">Step 1:</div>
            <p className="text-2xl text-gray-700">
              Divide your mistakes (SS<sub>res</sub>) by the total wiggle room (SS<sub>tot</sub>)
            </p>
            <p className="text-xl text-gray-600 mt-2">
              → This tells you what <span className="font-bold">fraction of variation you can't explain</span>
            </p>
          </div>

          <div className="bg-purple-50 border-l-8 border-purple-500 p-6 rounded-r-xl">
            <div className="text-3xl font-bold text-purple-800 mb-2">Step 2:</div>
            <p className="text-2xl text-gray-700">
              Subtract that from 1 (which is 100%)
            </p>
            <p className="text-xl text-gray-600 mt-2">
              → This gives you what <span className="font-bold">fraction of variation you CAN explain</span>
            </p>
          </div>

          <div className="bg-green-50 border-l-8 border-green-500 p-6 rounded-r-xl">
            <div className="text-3xl font-bold text-green-800 mb-2">Result:</div>
            <p className="text-2xl text-gray-700">
              R² = The percentage of variation explained by your relationship!
            </p>
          </div>
        </div>
      </div>

      {/* Real Example */}
      <div className="mb-8">
        <h3 className="text-5xl font-bold text-gray-800 mb-6">Real Example:</h3>
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-4 border-orange-300 rounded-xl p-8">
          <p className="text-3xl text-gray-800 mb-4">
            If <span className="font-extrabold text-orange-700">R² = 0.75</span> (75%) for "Impressions vs Clicks":
          </p>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-xl p-6 border-4 border-green-200">
              <p className="text-4xl font-bold text-green-700 mb-2">75%</p>
              <p className="text-xl text-gray-700">
                of the variation in clicks is explained by impressions
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border-4 border-gray-200">
              <p className="text-4xl font-bold text-gray-700 mb-2">25%</p>
              <p className="text-xl text-gray-700">
                is due to other factors (ad quality, timing, audience, etc.)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Takeaway */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-8">
        <div className="text-4xl font-extrabold mb-4 text-center">💡 Key Takeaway</div>
        <p className="text-2xl text-center leading-relaxed">
          Higher R² = Stronger relationship between the two metrics<br/>
          <span className="text-xl opacity-90 mt-2 block">
            But remember: <span className="font-bold">correlation ≠ causation!</span> Just because they move together doesn't mean one causes the other.
          </span>
        </p>
      </div>
    </div>
  )
}

export default RSquaredExplainer
