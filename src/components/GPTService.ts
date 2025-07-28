export async function obtenerRespuestaGPT(messages: { role: string; content: string }[]) {
  const res = await fetch('/api/gpt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  const data = await res.json();
  const content = data.content || '';

  const allDataPresent =
    messages.some(m => m.content.includes('@')) &&
    messages.some(m => m.content.match(/[0-9]{6,}/)) &&
    messages.some(m => m.content.length > 20);

  return {
    answer: content,
    leadCompleted: allDataPresent,
    leadData: {
      nombre: 'Nombre Genérico',
      correo: 'correo@ejemplo.cl',
      telefono: '+56912345678',
      mensaje: messages.at(-1)?.content || '',
      tipo_interes: 'contacto directo',
    }
  };
}