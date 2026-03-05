import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_URL =
  "https://script.google.com/macros/s/AKfycbyaH986n6CBGQi3OEWDkgG7dYMXxSmbpmNMx6AeibJtU2XqK0thgzVhy3NVRtmLndHSpg/exec";

const RSVPModal = ({ isOpen, onClose }: RSVPModalProps) => {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "already"
  >("idle");

  const handleConfirm = async () => {
    if (!code.trim()) return;

    setStatus("loading");

    try {
      const formData = new URLSearchParams();
      formData.append("codigo", code.trim());
      formData.append("quantidade", "1");

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyeawPKxkvgFH0OzySZKryj1ImR1BKoUCFJSoq_MuuW4AtK2Nh6ErhHEylMBsNFzlljrQ/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.status === "confirmado") {
        setStatus("success");
      } else if (data.status === "ja_confirmado") {
        setStatus("already");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setCode("");
    setStatus("idle");
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
            className="w-full max-w-md rounded-sm border border-gold-light bg-card p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-2xl font-light tracking-widest text-gold text-center mb-2">
              CONFIRMAR PRESENÇA
            </h2>

            <p className="text-muted-foreground text-center text-sm mb-6">
              Insira o código presente no seu convite
            </p>

            {status === "success" ? (
              <div className="text-center py-4">
                <p className="text-gold text-lg font-display">
                  Presença confirmada!
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Estamos ansiosos para celebrar com você.
                </p>

                <button
                  onClick={handleClose}
                  className="mt-6 border border-gold px-8 py-2 text-sm tracking-widest text-gold hover:bg-gold hover:text-primary-foreground transition-all"
                >
                  FECHAR
                </button>
              </div>
            ) : status === "already" ? (
              <div className="text-center py-4">
                <p className="text-gold text-lg font-display">
                  Presença já confirmada
                </p>

                <p className="text-muted-foreground text-sm mt-2">
                  Esse convite já foi confirmado anteriormente.
                </p>

                <button
                  onClick={handleClose}
                  className="mt-6 border border-gold px-8 py-2 text-sm tracking-widest text-gold hover:bg-gold hover:text-primary-foreground transition-all"
                >
                  FECHAR
                </button>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Código do convite"
                  className="w-full border border-gold-light bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground text-center tracking-widest text-sm focus:outline-none focus:border-gold transition-colors"
                />

                {status === "error" && (
                  <p className="text-destructive text-sm text-center mt-2">
                    Falha ao confirmar a presença. Verifique o código ou
                    comunique os noivos.
                  </p>
                )}

                <button
                  onClick={handleConfirm}
                  disabled={!code.trim() || status === "loading"}
                  className="mt-6 w-full border border-gold py-3 text-sm tracking-widest text-gold hover:bg-gold hover:text-primary-foreground transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "CONFIRMANDO..." : "CONFIRMAR"}
                </button>

                <button
                  onClick={handleClose}
                  className="mt-3 w-full py-2 text-sm tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  CANCELAR
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RSVPModal;