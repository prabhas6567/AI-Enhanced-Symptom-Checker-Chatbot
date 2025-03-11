import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={container}
    initial="hidden"
    animate="show"
  >
    {children}
  </motion.div>
);

export const AnimatedItem: React.FC<AnimatedContainerProps> = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={item}
  >
    {children}
  </motion.div>
);