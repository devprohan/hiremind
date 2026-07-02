const StatsSection = () => {
  return (
    <section className="py-24 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        <div className="bg-white rounded-3xl p-10 text-center shadow">
          <h2 className="text-5xl font-bold text-violet-600">50K+</h2>
          <p className="mt-3">Students</p>
        </div>

        <div className="bg-white rounded-3xl p-10 text-center shadow">
          <h2 className="text-5xl font-bold text-pink-500">95%</h2>
          <p className="mt-3">ATS Accuracy</p>
        </div>

        <div className="bg-white rounded-3xl p-10 text-center shadow">
          <h2 className="text-5xl font-bold text-cyan-500">100+</h2>
          <p className="mt-3">Companies</p>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;