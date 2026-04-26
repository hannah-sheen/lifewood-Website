export default function Hero() {
  return (
    <section className="min-h-screen bg-linear-to-br from-cream via-offwhite to-white flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-cream">
            <span className="text-green">✦</span>
            <span className="text-sm font-medium text-darkgreen">AI-Powered Data Excellence</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-semibold leading-tight text-darkgreen tracking-tighter">
            Transforming Data.<br />
            <span className="text-green">Empowering Humanity.</span>
          </h1>
          
          <p className="text-xl text-darkgreen/80 max-w-lg">
            The world’s leading provider of ethical AI data solutions. 
            We turn complex data into meaningful intelligence.
          </p>

          <div className="flex gap-4">
            <a href="#contact" className="bg-green hover:bg-darkgreen text-white px-8 py-4 rounded-2xl font-semibold transition-all text-lg">
              Get In Touch
            </a>
            <a href="#about" className="border-2 border-green text-green hover:bg-green hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all text-lg">
              Learn More
            </a>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="bg-linear-to-br from-green to-darkgreen rounded-3xl aspect-square flex items-center justify-center text-white/10 text-[300px] font-black tracking-tighter">
            LD
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-3xl shadow-xl">
            <div className="text-5xl font-semibold text-green">40+</div>
            <div className="text-darkgreen">Global Centers</div>
          </div>
        </div>
      </div>
    </section>
  )
}   