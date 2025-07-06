export default function Features() {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-center mb-10">Why EasyAccess?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Fast Search</h3>
            <p>Quickly find any paper from our database with smart filters.</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Organized Content</h3>
            <p>Papers are categorized by subject, year, and department.</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Downloadable</h3>
            <p>Download papers in one click for offline access.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
