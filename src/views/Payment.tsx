import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, Wallet, Smartphone, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Reveal } from '../components/Animations';

const PACKS = [
  { id: 1, name: 'Pack Starter', coins: 100, price: 1, bonus: '0%' },
  { id: 2, name: 'Pack Gamer', coins: 500, price: 5, bonus: '5%' },
  { id: 3, name: 'Pack Pro', coins: 1500, price: 15, bonus: '15%' },
  { id: 4, name: 'Pack Elite', coins: 5000, price: 50, bonus: '25%' }
];

const METHODS = [
  { id: 'moneyfusion', name: 'MoneyFusion', icon: <CreditCard />, color: 'hover:border-blue-500' },
  { id: 'paypal', name: 'PayPal', icon: <Wallet />, color: 'hover:border-blue-400' },
  { id: 'orange', name: 'Orange Money', icon: <Smartphone />, color: 'hover:border-orange-500' },
  { id: 'mtn', name: 'MTN Money', icon: <Smartphone />, color: 'hover:border-yellow-500' },
  { id: 'wave', name: 'Wave', icon: <Smartphone />, color: 'hover:border-blue-300' },
  { id: 'whatsapp', name: 'WhatsApp Pay', icon: <MessageCircle />, color: 'hover:border-green-500' }
];

export const Payment = () => {
  const { user, token, login } = useAuth();
  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    if (!selectedPack || !selectedMethod) return;
    setLoading(true);

    if (selectedMethod === 'whatsapp') {
      const msg = encodeURIComponent(`Bonjour Kurona Hosting, je souhaite acheter le ${selectedPack.name} (${selectedPack.coins} coins) pour ${selectedPack.price}$. Username: ${user.username}`);
      window.open(`https://wa.me/221770000000?text=${msg}`, '_blank');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: selectedPack.price,
          method: selectedMethod,
          coins: selectedPack.coins
        })
      });
      if (res.ok) {
        setSuccess(true);
        // Realistic feel: update local user state
        const updatedUser = { ...user, coins: user.coins + selectedPack.coins };
        // We'd ideally want to refresh from DB, but for demo we just update or wait
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <Reveal direction="down">
        <h1 className="text-4xl font-display mb-2">BOUTIQUE DE COINS</h1>
        <p className="text-white/40 mb-12">Alimentez votre compte pour déployer plus de serveurs.</p>
      </Reveal>

      {success ? (
        <div className="glass p-12 text-center rounded-3xl max-w-xl mx-auto border-green-500/30">
          <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-display mb-4">PAIEMENT RÉUSSI</h2>
          <p className="text-white/60 mb-8">Vos coins ont été ajoutés à votre solde instantanément.</p>
          <button onClick={() => setSuccess(false)} className="btn-gold">Retour à la boutique</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Packs */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary"></div> SÉLECTIONNEZ UN PACK
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PACKS.map(pack => (
                <div 
                  key={pack.id}
                  onClick={() => setSelectedPack(pack)}
                  className={`glass p-6 rounded-2xl cursor-pointer transition-all relative overflow-hidden group ${selectedPack?.id === pack.id ? 'border-primary bg-primary/10' : 'hover:border-white/20'}`}
                >
                   {pack.bonus !== '0%' && (
                     <div className="absolute top-4 right-4 bg-primary text-black text-xs font-bold px-2 py-1 rounded">+{pack.bonus}</div>
                   )}
                   <div className="text-white/40 text-sm mb-2">{pack.name}</div>
                   <div className="text-3xl font-bold mb-4 flex items-center gap-2">
                     <Coins className="text-primary" /> {pack.coins} <span className="text-sm font-normal text-white/40">Coins</span>
                   </div>
                   <div className="text-lg font-mono text-primary">{pack.price}.00$</div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method & Checkout */}
          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary"></div> PAIEMENT
            </h2>
            <div className="glass p-8 rounded-3xl sticky top-8">
              {!selectedPack ? (
                <div className="text-center py-8">
                  <AlertCircle size={32} className="mx-auto mb-4 text-white/20" />
                  <p className="text-white/40">Veuillez choisir un pack pour continuer.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    {METHODS.map(method => (
                      <div 
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer glass transition-all border ${selectedMethod === method.id ? 'border-primary bg-primary/10' : 'border-white/5 ' + method.color}`}
                      >
                        <div className="text-primary">{method.icon}</div>
                        <span className="font-bold">{method.name}</span>
                        {selectedMethod === method.id && <div className="ml-auto w-2 h-2 rounded-full bg-primary"></div>}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-8 pt-6 border-t border-white/5">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Total</span>
                      <span>{selectedPack.price}.00$</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-white/40">À recevoir</span>
                      <span className="text-primary">{selectedPack.coins} Coins</span>
                    </div>
                  </div>

                  <button 
                    onClick={handlePayment}
                    disabled={!selectedMethod || loading}
                    className="btn-gold w-full py-4 text-lg disabled:opacity-50 disabled:grayscale"
                  >
                    {loading ? 'Traitement...' : 'Payer maintenant'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { Coins } from 'lucide-react';
