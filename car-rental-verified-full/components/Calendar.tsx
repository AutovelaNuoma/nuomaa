import { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { ref, onValue, set } from 'firebase/database';

const monthNames = [
  'Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis',
  'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'
];

export default function Calendar({ plate, editable }: { plate: string; editable: boolean }) {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0–11
  const [days, setDays] = useState<boolean[]>([]);
  const [daysInMonth, setDaysInMonth] = useState<number>(30);

  // 🔄 Užkrauti dienas iš Firebase
  useEffect(() => {
    const totalDays = new Date(year, month + 1, 0).getDate();
    setDaysInMonth(totalDays);

    const key = `${year}-${month + 1}`; // pvz: 2025-6
    const carRef = ref(db, `automobiliai/${plate}/istorija/${key}`);

    onValue(carRef, (snapshot) => {
      const data = snapshot.val();
      if (data && Array.isArray(data)) {
        setDays(data.slice(0, totalDays));
      } else {
        setDays(Array(totalDays).fill(false));
      }
    });
  }, [plate, year, month]);

  const toggle = (i: number) => {
    if (!editable) return;
    const updated = [...days];
    updated[i] = !updated[i];

    const key = `${year}-${month + 1}`;
    const saveRef = ref(db, `automobiliai/${plate}/istorija/${key}`);
    set(saveRef, updated);
    setDays(updated);
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="text-lg px-2 py-1 bg-gray-200 rounded">←</button>
        <h3 className="text-lg font-semibold">
          {monthNames[month]} {year}
        </h3>
        <button onClick={nextMonth} className="text-lg px-2 py-1 bg-gray-200 rounded">→</button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: daysInMonth }, (_, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`px-3 py-2 rounded text-white ${days[i] ? 'bg-red-500' : 'bg-green-500'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
