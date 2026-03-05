import { FormEvent, useMemo, useState } from 'react';

type Section = 'home' | 'presenca' | 'presentes' | 'evento';

type Gift = {
  id: number;
  name: string;
  description: string;
  value: string;
};

const RSVP_POST_URL = 'https://sua-api.com/rsvp';
const GIFT_POST_URL = 'https://sua-api.com/gifts';

const gifts: Gift[] = [
  {
    id: 1,
    name: 'Jantar especial para lua de mel',
    description: 'Ajude com uma noite romântica durante nossa viagem.',
    value: 'R$ 250,00',
  },
  {
    id: 2,
    name: 'Passeio inesquecível',
    description: 'Contribuição para um passeio especial no destino.',
    value: 'R$ 380,00',
  },
  {
    id: 3,
    name: 'Café da manhã dos sonhos',
    description: 'Um início de dia delicioso para os recém-casados.',
    value: 'R$ 120,00',
  },
  {
    id: 4,
    name: 'Noite em hotel boutique',
    description: 'Ajuda para uma hospedagem inesquecível.',
    value: 'R$ 520,00',
  },
];

const validInviteCodes = ['BIAFER2026', 'CONVIDADO123', 'FAMILIA01'];

async function postData(url: string, payload: unknown) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Não foi possível concluir a requisição.');
  }
}

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [inviteCode, setInviteCode] = useState('');
  const [isInviteCodeValid, setIsInviteCodeValid] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState('');
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [giftStatus, setGiftStatus] = useState('');
  const [guestName, setGuestName] = useState('');

  const eventAddress =
    'Estr. Keida Harada, 10781 - Ipelândia, Suzano - SP, 08620-050';

  const mapsLink = useMemo(
    () =>
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventAddress)}`,
    [eventAddress],
  );

  const checkInviteCode = () => {
    const normalizedCode = inviteCode.trim().toUpperCase();
    const valid = validInviteCodes.includes(normalizedCode);
    setIsInviteCodeValid(valid);
    setRsvpStatus(valid ? 'Código válido! Agora você já pode confirmar presença.' : 'Código inválido. Verifique seu convite.');
  };

  const handleRsvpSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isInviteCodeValid) return;

    try {
      await postData(RSVP_POST_URL, {
        code: inviteCode.trim().toUpperCase(),
        guestName: guestName.trim(),
        confirmedAt: new Date().toISOString(),
      });
      setRsvpStatus('Presença confirmada com sucesso! Estamos ansiosos para celebrar com você.');
    } catch (error) {
      setRsvpStatus(error instanceof Error ? error.message : 'Erro inesperado ao confirmar presença.');
    }
  };

  const handleGiftSubmit = async () => {
    if (!selectedGift) return;

    try {
      await postData(GIFT_POST_URL, {
        giftId: selectedGift.id,
        giftName: selectedGift.name,
        selectedAt: new Date().toISOString(),
      });
      setGiftStatus(`Obrigado! Você presenteou: ${selectedGift.name}.`);
    } catch (error) {
      setGiftStatus(error instanceof Error ? error.message : 'Erro inesperado ao presentear.');
    }
  };

  return (
    <div className="app">
      <header className="topbar">
        <span className="logo">B & F</span>
        <nav>
          <button onClick={() => setActiveSection('home')}>Início</button>
          <button onClick={() => setActiveSection('presenca')}>Confirmar Presença</button>
          <button onClick={() => setActiveSection('presentes')}>Lista de Presentes</button>
          <button onClick={() => setActiveSection('evento')}>Evento</button>
        </nav>
      </header>

      {activeSection === 'home' && (
        <main className="hero panel">
          <p className="hero-highlight">Save the date</p>
          <h1>BEATRIZ & FERNANDO</h1>
          <p className="hero-date">10.04.2027</p>
          <p className="hero-copy">
            Com muita alegria, convidamos você para celebrar esse momento especial ao nosso lado.
          </p>
        </main>
      )}

      {activeSection === 'presenca' && (
        <main className="panel form-panel">
          <h2>Confirmar Presença</h2>
          <p>Insira o código do convite para liberar a confirmação.</p>
          <form onSubmit={handleRsvpSubmit}>
            <label htmlFor="guestName">Seu nome</label>
            <input
              id="guestName"
              value={guestName}
              onChange={(event) => setGuestName(event.target.value)}
              placeholder="Digite seu nome"
              required
            />

            <label htmlFor="inviteCode">Código do convite</label>
            <div className="input-row">
              <input
                id="inviteCode"
                value={inviteCode}
                onChange={(event) => {
                  setInviteCode(event.target.value);
                  setIsInviteCodeValid(false);
                  setRsvpStatus('');
                }}
                placeholder="Ex.: BIAFER2026"
                required
              />
              <button type="button" className="secondary" onClick={checkInviteCode}>
                Validar código
              </button>
            </div>

            <button type="submit" className="primary" disabled={!isInviteCodeValid}>
              Confirmar presença
            </button>
          </form>
          {rsvpStatus && <p className="status">{rsvpStatus}</p>}
        </main>
      )}

      {activeSection === 'presentes' && (
        <main className="panel gifts-panel">
          <h2>Lista de Presentes</h2>
          <p>Escolha uma opção e clique em presentear.</p>
          <div className="gifts-grid">
            {gifts.map((gift) => (
              <button
                key={gift.id}
                className={`gift-card ${selectedGift?.id === gift.id ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedGift(gift);
                  setGiftStatus('');
                }}
              >
                <h3>{gift.name}</h3>
                <p>{gift.value}</p>
              </button>
            ))}
          </div>

          {selectedGift && (
            <section className="gift-detail">
              <h3>{selectedGift.name}</h3>
              <p>{selectedGift.description}</p>
              <strong>{selectedGift.value}</strong>
              <button className="primary" onClick={handleGiftSubmit}>
                PRESENTEAR
              </button>
            </section>
          )}

          {giftStatus && <p className="status">{giftStatus}</p>}
        </main>
      )}

      {activeSection === 'evento' && (
        <main className="panel event-panel">
          <h2>Informações do Evento</h2>
          <p>
            <strong>Data:</strong> 10 de abril de 2027
          </p>
          <p>
            <strong>Horário:</strong> Cerimônia às 16h e recepção às 18h
          </p>
          <p>
            <strong>Local:</strong> {eventAddress}
          </p>
          <p>
            <strong>Estacionamento:</strong> Haverá estacionamento no local com acesso pelo portão lateral.
          </p>
          <a href={mapsLink} target="_blank" rel="noreferrer" className="primary link-button">
            Abrir no Google Maps
          </a>
        </main>
      )}
    </div>
  );
}
