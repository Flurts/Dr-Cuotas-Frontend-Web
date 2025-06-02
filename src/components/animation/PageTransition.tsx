import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const transitionVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 0 },
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    // Oculta la animación después de cierto tiempo
    const timeout = setTimeout(() => {
      setShowTransition(false);
    }, 1500); // duración total en milisegundos

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showTransition && (
          <motion.div
            key="initial-loader"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-2xl"
            initial="hidden"
            animate="visible"
            exit="visible"
            variants={transitionVariants}
            transition={{ duration: 1 }}
          >
            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido de la página */}
      {children}
    </>
  );
}
