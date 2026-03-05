import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import RSVPModal from "@/components/RSVPModal";
import GiftListPage from "@/components/GiftListPage";
import EventSection from "@/components/EventSection";

const Index = () => {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [giftsOpen, setGiftsOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);

  if (giftsOpen) {
    return <GiftListPage onBack={() => setGiftsOpen(false)} />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-overlay" />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6"
      >
        <div className="font-display text-xl tracking-[0.3em] text-gold font-light">
          B <span className="text-gold-light">&</span> F
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => setRsvpOpen(true)}
            className="text-xs tracking-[0.2em] text-foreground hover:text-gold transition-colors font-body"
          >
            CONFIRMAR PRESENÇA
          </button>
          <button
            onClick={() => setGiftsOpen(true)}
            className="text-xs tracking-[0.2em] text-foreground hover:text-gold transition-colors font-body"
          >
            LISTA DE PRESENTES
          </button>
          <button
            onClick={() => setEventOpen(true)}
            className="text-xs tracking-[0.2em] text-foreground hover:text-gold transition-colors font-body"
          >
            O EVENTO
          </button>
        </div>
        <button
          onClick={() => setRsvpOpen(true)}
          className="border border-gold px-5 py-2 text-xs tracking-[0.2em] text-gold hover:bg-gold hover:text-primary-foreground transition-all font-body"
        >
          PRESENÇA
        </button>
      </motion.nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-88px)] text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-script text-gold text-3xl md:text-5xl mb-4"
        >
          Save the date
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-display text-4xl md:text-7xl lg:text-8xl font-light tracking-[0.15em] text-foreground mb-4"
        >
          BEATRIZ <span className="text-gold">&</span> FERNANDO
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-16 h-px bg-gold opacity-50" />
          <p className="font-display text-lg md:text-2xl tracking-[0.3em] text-gold-light font-light">
            10.04.2027
          </p>
          <div className="w-16 h-px bg-gold opacity-50" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-muted-foreground text-sm md:text-base max-w-lg leading-relaxed italic font-display"
        >
          "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha."
          <br />
          <span className="text-xs tracking-widest mt-2 block not-italic">1 Coríntios 13:4</span>
        </motion.p>

        {/* Mobile buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col md:hidden gap-3 mt-10"
        >
          <button
            onClick={() => setRsvpOpen(true)}
            className="border border-gold px-8 py-3 text-xs tracking-[0.2em] text-gold hover:bg-gold hover:text-primary-foreground transition-all"
          >
            CONFIRMAR PRESENÇA
          </button>
          <button
            onClick={() => setGiftsOpen(true)}
            className="border border-gold-light px-8 py-3 text-xs tracking-[0.2em] text-foreground hover:border-gold hover:text-gold transition-all"
          >
            LISTA DE PRESENTES
          </button>
          <button
            onClick={() => setEventOpen(true)}
            className="border border-gold-light px-8 py-3 text-xs tracking-[0.2em] text-foreground hover:border-gold hover:text-gold transition-all"
          >
            O EVENTO
          </button>
        </motion.div>
      </div>

      {/* Modals */}
      <RSVPModal isOpen={rsvpOpen} onClose={() => setRsvpOpen(false)} />
      <EventSection isOpen={eventOpen} onClose={() => setEventOpen(false)} />
    </div>
  );
};

export default Index;
