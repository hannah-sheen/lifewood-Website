export default function About() {
  return (
    <div className="pt-20 pb-24 bg-seaSalt">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-6xl font-semibold text-center mb-6">About Lifewood</h1>
        <p className="text-center text-xl text-darkSerpent/70 max-w-2xl mx-auto">
          Empowering communities through ethical data, AI innovation, and sustainable impact worldwide.
        </p>

        <div className="prose prose-lg mt-20 max-w-none text-darkSerpent/80">
          <p>
            At Lifewood we empower our company and our clients to realize the transformative power of AI: 
            bringing big data to life, launching new ways of thinking, innovating, learning, and doing.
          </p>
          <p className="mt-8">
            Founded in 2004, Lifewood Data Technology is a global provider of AI data and technology services. 
            We specialize in data engineering, preparation, annotation, and labeling to support artificial intelligence 
            and machine learning solutions across multiple industries.
          </p>
        </div>
      </div>
    </div>
  );
}