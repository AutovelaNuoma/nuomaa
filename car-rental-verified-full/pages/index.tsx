import { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { ref, onValue } from 'firebase/database';
import Calendar from '../components/Calendar';

export default function Home() {
  const [cars, setCars] = useState<string[]>([]);

  useEffect(() => {
    const carRef = ref(db, 'cars');
    onValue(carRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCars(Object.keys(data));
      }
    });
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">🚗 Automobilių Nuoma</h1>
      {cars.length === 0 && <p>Automobilių dar nėra</p>}
      {cars.map((plate) => (
        <div key={plate} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{plate}</h2>
          <Calendar plate={plate} editable={false} />
        </div>
      ))}
    </main>
  );
}
