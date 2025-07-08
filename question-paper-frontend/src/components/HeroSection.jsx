export default function HeroSection() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="hero min-h-[80vh] flex items-center justify-center relative 
                   bg-gradient-to-r from-sky-200 via-green-200 to-yellow-200 
                   dark:from-cyan-800 dark:via-green-900 dark:to-lime-200"
        id="home"
        aria-label="Hero section"
      >
        <div className="container text-center px-4 z-10">
          <div className="max-w-2xl mx-auto text-black dark:text-white">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
              Access Question Papers Easily
            </h1>
            <p className="text-lg sm:text-xl mb-6 text-gray-700 dark:text-gray-300">
              Your centralized platform for previous years' question papers — organized and easy to find.
            </p>
            <a
              href="#about"
              className="btn btn-primary mt-4"
              aria-label="Scroll to About section"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="bg-base-100 py-20 px-4"
        aria-label="About Easy Access"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary">About Easy Access</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Easy Access helps students find and review previous years' question papers effortlessly.
            Organized by subjects, departments, and years, we empower you to prepare smarter and faster.
          </p>
        </div>
      </section>
    </main>
  );
}
