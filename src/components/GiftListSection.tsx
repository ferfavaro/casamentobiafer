import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface Gift {
  id: number;
  name: string;
  description: string;
  image: string;
}

const gifts: Gift[] = [
  { id: 1, name: "Jogo de Panelas", description: "Jogo de panelas antiaderente com 5 peças para o dia a dia do casal.", image: "🍳" },
  { id: 2, name: "Jogo de Cama", description: "Jogo de cama queen 400 fios, 100% algodão egípcio.", image: "🛏️" },
  { id: 3, name: "Cafeteira Elétrica", description: "Cafeteira elétrica programável para manhãs mais práticas.", image: "☕" },
  { id: 4, name: "Jogo de Toalhas", description: "Kit com 6 toalhas de banho macias em algodão premium.", image: "🛁" },
  { id: 5, name: "Aspirador Robô", description: "Aspirador robô inteligente com mapeamento e controle por app.", image: "🤖" },
  { id: 6, name: "Jogo de Taças", description: "Conjunto de 6 taças de cristal para vinho tinto e branco.", image: "🥂" },
  { id: 7, name: "Liquidificador", description: "Liquidificador de alta potência com jarra de vidro temperado.", image: "🧃" },
  { id: 8, name: "Kit Churrasco", description: "Kit premium de churrasco com 12 peças em aço inox e estojo de couro.", image: "🥩" },
];

interface GiftListSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

const GiftListSection = ({ isOpen, onClose }: GiftListSectionProps) => {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [gifting, setGifting] = useState(false);
  const [giftSuccess, setGiftSuccess] = useState(false);

  const handleGift = async (gift: Gift) => {
    setGifting(true);
    try {
      // TODO: substituir pela URL real da API
      await fetch("https://sua-api.com/presentear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ presenteId: gift.id, presenteNome: gift.name }),
      });
      setGiftSuccess(true);
    } catch {
      // handle error silently for now
    } finally {
      setGifting(false);
    }
  };

  const handleBack = () => {
    setSelectedGift(null);
    setGiftSuccess(false);
  };

  const handleClose = () => {
    setSelectedGift(null);
    setGiftSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-heavy p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl max-h-[85vh] rounded-sm border border-gold-light bg-card overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gold-light flex items-center justify-between">
              {selectedGift ? (
                <button onClick={handleBack} className="text-gold hover:text-gold-light transition-colors">
                  <ArrowLeft size={20} />
                </button>
              ) : (
                <div />
              )}
              <h2 className="font-display text-2xl font-light tracking-widest text-gold text-center flex-1">
                LISTA DE PRESENTES
              </h2>
              <button onClick={handleClose} className="text-muted-foreground hover:text-foreground text-xl">
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
              {selectedGift ? (
                <div className="text-center">
                  <div className="text-6xl mb-4">{selectedGift.image}</div>
                  <h3 className="font-display text-xl text-gold mb-3">{selectedGift.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md mx-auto">
                    {selectedGift.description}
                  </p>
                  {giftSuccess ? (
                    <div>
                      <p className="text-gold font-display text-lg">Obrigado pelo presente! 💛</p>
                      <button
                        onClick={handleBack}
                        className="mt-4 border border-gold px-8 py-2 text-sm tracking-widest text-gold hover:bg-gold hover:text-primary-foreground transition-all"
                      >
                        VER OUTROS PRESENTES
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleGift(selectedGift)}
                      disabled={gifting}
                      className="border border-gold px-10 py-3 text-sm tracking-widest text-gold hover:bg-gold hover:text-primary-foreground transition-all disabled:opacity-40"
                    >
                      {gifting ? "ENVIANDO..." : "PRESENTEAR"}
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {gifts.map((gift) => (
                    <button
                      key={gift.id}
                      onClick={() => setSelectedGift(gift)}
                      className="border border-gold-light p-4 text-center hover:border-gold hover:bg-secondary transition-all group"
                    >
                      <div className="text-3xl mb-2">{gift.image}</div>
                      <p className="font-display text-sm text-foreground group-hover:text-gold transition-colors">
                        {gift.name}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GiftListSection;
