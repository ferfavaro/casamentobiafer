import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Gift, Copy, Check } from "lucide-react";

interface GiftItem {
  id: number;
  name: string;
  description: string;
  price: number;
  emoji: string;
}

const gifts: GiftItem[] = [
  { id: 1, name: "Jogo de Panelas", description: "Jogo de panelas antiaderente com 5 peças para o dia a dia do casal.", price: 350, emoji: "🍳" },
  { id: 2, name: "Jogo de Cama", description: "Jogo de cama queen 400 fios, 100% algodão egípcio.", price: 280, emoji: "🛏️" },
  { id: 3, name: "Cafeteira Elétrica", description: "Cafeteira elétrica programável para manhãs mais práticas.", price: 420, emoji: "☕" },
  { id: 4, name: "Jogo de Toalhas", description: "Kit com 6 toalhas de banho macias em algodão premium.", price: 190, emoji: "🛁" },
  { id: 5, name: "Aspirador Robô", description: "Aspirador robô inteligente com mapeamento e controle por app.", price: 1200, emoji: "🤖" },
  { id: 6, name: "Jogo de Taças", description: "Conjunto de 6 taças de cristal para vinho tinto e branco.", price: 160, emoji: "🥂" },
  { id: 7, name: "Liquidificador", description: "Liquidificador de alta potência com jarra de vidro temperado.", price: 250, emoji: "🧃" },
  { id: 8, name: "Kit Churrasco", description: "Kit premium de churrasco com 12 peças em aço inox e estojo de couro.", price: 380, emoji: "🥩" },
];

interface GiftListPageProps {
  onBack: () => void;
}

const GiftListPage = ({ onBack }: GiftListPageProps) => {
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [copied, setCopied] = useState(false);

  // TODO: Substitua pela sua chave PIX real
  const pixKey = "sua-chave-pix@email.com";

  const generatePixCode = (gift: GiftItem) => {
    // Placeholder - em produção, gerar código PIX real via API
    return `00020126580014BR.GOV.BCB.PIX0136${pixKey}5204000053039865404${gift.price.toFixed(2)}5802BR5913BEATRIZ FERNANDO6009SAO PAULO62140510${String(gift.id).padStart(10, "0")}6304`;
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <div className="border-b border-gold-light">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-5">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm tracking-widest font-body"
          >
            <ArrowLeft size={18} />
            VOLTAR
          </button>
          <div className="font-display text-xl tracking-[0.3em] text-gold font-light">
            B <span className="text-gold-light">&</span> F
          </div>
          <div className="w-20" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center py-10">
        <Gift className="text-gold mx-auto mb-3" size={28} />
        <h1 className="font-display text-3xl md:text-4xl tracking-[0.15em] text-foreground font-light">
          LISTA DE PRESENTES
        </h1>
        <p className="text-muted-foreground text-sm mt-3 max-w-md mx-auto">
          Escolha um presente e contribua via PIX. Sua generosidade significa muito para nós!
        </p>
      </div>

      {/* Gift Grid */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gifts.map((gift, i) => (
            <motion.button
              key={gift.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setSelectedGift(gift)}
              className="border border-gold-light bg-card p-6 text-left hover:border-gold transition-all group"
            >
              <div className="text-4xl mb-3">{gift.emoji}</div>
              <h3 className="font-display text-lg text-foreground group-hover:text-gold transition-colors">
                {gift.name}
              </h3>
              <p className="text-muted-foreground text-xs mt-2 leading-relaxed line-clamp-2">
                {gift.description}
              </p>
              <p className="text-gold font-display text-xl mt-4">
                {formatPrice(gift.price)}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* PIX Modal */}
      <AnimatePresence>
        {selectedGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-heavy p-4"
            onClick={() => { setSelectedGift(null); setCopied(false); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md rounded-sm border border-gold-light bg-card p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-5xl mb-3">{selectedGift.emoji}</div>
                <h2 className="font-display text-2xl text-gold mb-1">{selectedGift.name}</h2>
                <p className="text-muted-foreground text-sm mb-2">{selectedGift.description}</p>
                <p className="font-display text-3xl text-gold-light mb-6">
                  {formatPrice(selectedGift.price)}
                </p>

                <div className="border border-gold-light bg-secondary p-4 mb-4">
                  <p className="text-xs tracking-widest text-muted-foreground mb-2">CÓDIGO PIX</p>
                  <p className="text-foreground text-xs break-all font-mono leading-relaxed">
                    {generatePixCode(selectedGift)}
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(generatePixCode(selectedGift))}
                  className="w-full flex items-center justify-center gap-2 border border-gold py-3 text-sm tracking-widest text-gold hover:bg-gold hover:text-primary-foreground transition-all"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      COPIADO!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      COPIAR CÓDIGO PIX
                    </>
                  )}
                </button>

                <button
                  onClick={() => { setSelectedGift(null); setCopied(false); }}
                  className="mt-3 w-full py-2 text-sm tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  FECHAR
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GiftListPage;
