export default function Stats() {
  const stats = [
    { number: "40+", label: "Global Delivery Centers" },
    { number: "30+", label: "Countries Across All Continents" },
    { number: "50+", label: "Languages & Dialects" },
    { number: "56,000+", label: "Global Online Resources" },
  ]

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-3xl p-10 text-center hover:shadow-xl transition-shadow">
              <div className="text-6xl font-semibold text-green mb-2">{stat.number}</div>
              <div className="text-darkgreen font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}