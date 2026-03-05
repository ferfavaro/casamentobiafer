import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Car } from "lucide-react";

interface EventSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventSection = ({ isOpen, onClose }: EventSectionProps) => {
  const address = "Estr. Keida Harada, 10781 - Ipelândia, Suzano - SP, 08620-050";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-heavy p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-lg rounded-sm border border-gold-light bg-card overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gold-light flex items-center justify-between">
              <div />
              <h2 className="font-display text-2xl font-light tracking-widest text-gold text-center flex-1">
                O EVENTO
              </h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xl">
                ✕
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Localização */}
              <div className="flex gap-4">
                <MapPin className="text-gold shrink-0 mt-1" size={22} />
                <div>
                  <h3 className="font-display text-lg text-gold mb-1">Localização</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">{address}</p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-gold px-6 py-2 text-xs tracking-widest text-gold hover:bg-gold hover:text-primary-foreground transition-all"
                  >
                    VER NO MAPA
                  </a>
                </div>
              </div>

              {/* Horário */}
              <div className="flex gap-4">
                <Clock className="text-gold shrink-0 mt-1" size={22} />
                <div>
                  <h3 className="font-display text-lg text-gold mb-1">Horário</h3>
                  <p className="text-muted-foreground text-sm">
                    A cerimônia terá início às <span className="text-foreground">16:00</span>
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Recepção a partir das <span className="text-foreground">17:00</span>
                  </p>
                </div>
              </div>

              {/* Estacionamento */}
              <div className="flex gap-4">
                <Car className="text-gold shrink-0 mt-1" size={22} />
                <div>
                  <h3 className="font-display text-lg text-gold mb-1">Estacionamento</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    O local possui estacionamento gratuito para os convidados. Há manobrista disponível.
                  </p>
                </div>
              </div>

              {/* Mapa embed */}
              <div className="border border-gold-light overflow-hidden">
                <iframe
                  title="Localização do evento"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.5!2d-46.3!3d-23.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAwLjAiUyA0NsKwMTgnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1&q=${encodeURIComponent(address)}`}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventSection;
