import { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { ref, onValue, set } from 'firebase/database';

export default function Calendar({ plate, editable }: { plate: string, editable: boolean }) {
  const [days, setDays] = useState<boolean[]>(Array(31).fill(false));
  const [daysInMonth, setDaysInMonth] = useState<number>(30);

  useEffect(() => {
    const now = new Date();
    const total = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    setDaysInMonth(total);

    const carRef = ref(db, 'cars/' + plate);
    onValue(carRef, (snapshot) => {
      const data = snapshot.val();
      if (data && Array.isArray(data)) {
        setDays(data.slice(0, total));
      }
    });
  }, [plate]);

  const toggle = (i: number) => {
    if (!editable) return;
    const updated = [...days];
    updated[i] = !updated[i];
    set(ref(db, 'cars/' + plate), updated);
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {Array.from({ length: daysInMonth }, (_, i) => (
        <button
          key={i}
          onClick={() => toggle(i)}
          className={\`px-3 py-2 rounded text-white \${days[i] ? 'bg-red-500' : 'bg-green-500'}\`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
