import React from 'react'
import { motion, AnimatePresence } from "framer-motion";


export  function SidebarAnimation({children}) {

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "-270px", opacity: 0 }}
        animate={{ x: "0px", opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ duration: .5 }}
      >
        {children}
      </motion.div>
  </AnimatePresence>
    )
}


export   function SlideMotion({children}){
  return (
    <AnimatePresence>
      <motion.div
        initial={{x: "5%", opacity: 0 }}
        animate={{ x: "0px", opacity: 1 }}
        exit={{  x: "100%", opacity: 0 }}
        transition={{ duration: .5 }}
        
      >
        {children}
      </motion.div>
  </AnimatePresence>
    )
}


export function Backdrop ({ children, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};