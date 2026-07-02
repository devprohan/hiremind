import { motion } from "framer-motion";

const FeatureCard = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-3xl p-8 shadow-lg"
    >
      <Icon className="text-violet-600 mb-5" size={40} />

      <h3 className="text-2xl font-bold mb-3">
        {feature.title}
      </h3>

      <p className="text-slate-600">
        {feature.desc}
      </p>
    </motion.div>
  );
};

export default FeatureCard;