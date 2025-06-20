import { useState } from 'react';
import { db } from '../utils/firebase';
import { ref, set } from 'firebase/database';
import Calendar from '../components/Calendar';

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [input, setInput] = useState('');
  const [plate, setPlate] = useState('');

  const handleAuth = () => {
    if (input === 'autovelapadangos') {
      setAuth(true);
    } else {
      alert('Neteisingas slaptažodis');
    }
  };

  const handleAddCar = () => {
    if (plate.trim() === '') return;
    const days = Array(31).fill(false);
    set(ref(db, 'cars/' + plate), days);
    setPlate('');
  };

  if (!auth) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-bold mb-4">🔒 Admino prisijungimas</h1>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Slaptažodis"
          className="border p-2 mr-2"
        />
        <button onClick={handleAuth} className="bg-blue-600 text-white px-4 py-2 rounded">
          Prisijungti
        </button>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">🔐 Admin zona</h1>
      <div className="mb-4">
        <input
          type="text"
          value={plate}
          onChange={(e) => setPlate(e.target.value.toUpperCase())}
          placeholder="Įveskite valstybinį numerį"
          className="border p-2 mr-2"
        />
        <button onClick={handleAddCar} className="bg-blue-600 text-white px-4 py-2 rounded">
          ➕ Pridėti automobilį
        </button>
      </div>
      {plate && (
        <>
          <h2 className="text-xl font-semibold mt-4">{plate}</h2>
          <Calendar plate={plate} editable={true} />
        </>
      )}
    </main>
  );
}
