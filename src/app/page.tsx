'use client';
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const handleTranslate = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      setResult(data.translation || 'Not found');
    } catch (err) {
      setResult('Error connecting to Brain');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Om-toloki</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Word..." />
      <button onClick={handleTranslate}>Translate</button>
      <p>Result: {result}</p>
    </div>
  );
}
