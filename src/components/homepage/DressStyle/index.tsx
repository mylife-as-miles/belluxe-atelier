import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import * as motion from "framer-motion/client";
import DressStyleCard from "./DressStyleCard";

const DressStyle = () => {
  return (
    <div className="px-4 xl:px-0">
      <section className="max-w-frame mx-auto bg-[#F0F0F0] px-6 pb-6 pt-10 md:p-[70px] rounded-[40px] text-center">
        <motion.h2
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn([
            integralCF.className,
            "text-[32px] leading-[36px] md:text-5xl mb-8 md:mb-14 capitalize",
          ])}
        >
          BROWSE BY JEWELRY STYLE
        </motion.h2>
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row md:h-[289px] space-y-4 sm:space-y-0 sm:space-x-5 mb-4 sm:mb-5"
        >
          <DressStyleCard
            title="Earrings"
            url="/shop#earrings"
            className="md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px] bg-[url('https://images.unsplash.com/photo-1629224316810-9d8805b95e76?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxlYXJyaW5nc3xlbnwwfHx8fDE3NTI3MjA0NDd8MA&ixlib=rb-4.1.0&q=85')] bg-cover bg-center"
          />
          <DressStyleCard
            title="Necklaces"
            url="/shop#necklaces"
            className="md:max-w-[684px] h-[190px] bg-[url('https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxuZWNrbGFjZXxlbnwwfHx8fDE3NTI3MjA0NjN8MA&ixlib=rb-4.1.0&q=85')] bg-cover bg-center"
          />
        </motion.div>
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row md:h-[289px] space-y-5 sm:space-y-0 sm:space-x-5 mb-4 sm:mb-5"
        >
          <DressStyleCard
            title="Rings"
            url="/shop#rings"
            className="md:max-w-[684px] h-[190px] bg-[url('https://images.unsplash.com/photo-1617038220319-276d3cfab638?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5fGVufDB8fHx8MTc1MjcyMDY1N3ww&ixlib=rb-4.1.0&q=85')] bg-cover bg-center"
          />
          <DressStyleCard
            title="Bracelets"
            url="/shop#bracelets"
            className="md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px] bg-[url('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxicmFjZWxldHN8ZW58MHx8fHwxNzUyNzIwNjY1fDA&ixlib=rb-4.1.0&q=85')] bg-cover bg-center"
          />
        </motion.div>
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row md:h-[289px] space-y-5 sm:space-y-0 sm:space-x-5"
        >
          <DressStyleCard
            title="Watches"
            url="/shop#watches"
            className="md:max-w-[407px] h-[190px] bg-[url('/images/dress-style-1.png')] bg-cover bg-center"
          />
          <DressStyleCard
            title="Jewelry Sets"
            url="/shop#jewelry-sets"
            className="md:max-w-[684px] h-[190px] bg-[url('https://images.pexels.com/photos/6662322/pexels-photo-6662322.jpeg')] bg-cover bg-center"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default DressStyle;