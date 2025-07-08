export default function Features() {
  return (
    <section
      className="p-10 bg-base-200"
      id="features"
      aria-labelledby="features-heading"
    >
      <h2
        id="features-heading"
        className="text-3xl font-bold text-center mb-10 text-primary"
      >
        Why EasyAccess?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Fast Search",
            description: "Quickly find any paper from our database with smart filters.",
          },
          {
            title: "Organized Content",
            description: "Papers are categorized by subject, year, and department.",
          },
          {
            title: "Downloadable",
            description: "Download papers in one click for offline access.",
          },
        ].map((feature, index) => (
          <article
            key={index}
            className="card bg-base-100 shadow-xl transition-transform duration-300 hover:scale-105"
            aria-label={feature.title}
          >
            <div className="card-body">
              <h3 className="card-title text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-base-content">{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
