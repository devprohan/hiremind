import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        <h1 className="text-3xl font-bold">
          Hire<span className="text-violet-600">Mind</span>
        </h1>

        <div className="hidden md:flex gap-8">
          <a href="#">Features</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-violet-600 text-white px-6 py-3 rounded-xl"
        >
          Get Started
        </motion.button>

      </div>
    </nav>
  );
};

export default Navbar;