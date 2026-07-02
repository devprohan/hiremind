const steps = [
  "Upload Resume",
  "AI Analysis",
  "Improve Skills",
  "Get Placed"
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-5xl font-bold text-center mb-20">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step}
              className="bg-slate-50 p-8 rounded-3xl text-center"
            >
              <div className="w-14 h-14 rounded-full bg-violet-600 text-white flex items-center justify-center mx-auto mb-5">
                {index + 1}
              </div>

              <h3 className="text-xl font-semibold">
                {step}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;