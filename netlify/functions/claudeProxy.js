// netlify/functions/claudeProxy.js
// Proxy seguro hacia Claude API — Domina 40R GAFI

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return { statusCode: 500, body: JSON.stringify({ error: 'API key no configurada.' }) };
    }

    try {
        const { text, typologyList, mode } = JSON.parse(event.body);

        let prompt;

        if (mode === 'consultor') {
            prompt = `Eres un experto consultor en Prevención de Lavado de Dinero (PLD) y Financiamiento al Terrorismo (FT), especializado en las 40 Recomendaciones del GAFI/FATF.

Un profesional del sector financiero o compliance te hace la siguiente consulta sobre una situación real de su trabajo:

"${text}"

Lista de Recomendaciones del GAFI disponibles: [${typologyList}]

Responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional, sin markdown, sin backticks, con exactamente este formato:
{
  "recomendaciones_aplicables": ["R.10", "R.12"],
  "acciones": ["Acción concreta 1", "Acción concreta 2", "Acción concreta 3"],
  "nivel_riesgo": "ALTO",
  "conclusion": "Análisis profesional breve y práctico de la situación."
}

El nivel_riesgo debe ser: ALTO, MEDIO o BAJO.
Las acciones deben ser prácticas y concretas, no teóricas.`;
        } else {
            prompt = `Actúa como un experto en prevención de lavado de dinero (PLD) en México.
Analiza el siguiente texto y responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional, sin markdown, sin backticks.

Lista de tipologías de la UIF México: [${typologyList}]
Texto a analizar: "${text}"

Formato exacto:
{
  "posibles_tipologias": ["tipología 1", "tipología 2"],
  "senales_alerta": ["señal 1", "señal 2", "señal 3"],
  "conclusion": "Conclusión profesional del análisis."
}`;
        }

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1000,
                messages: [{ role: 'user', content: prompt }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return { statusCode: response.status, body: JSON.stringify({ error: data.error?.message || 'Error de API' }) };
        }

        const rawText = data.content[0].text.trim();
        const cleanJson = rawText.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleanJson);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(parsed)
        };

    } catch (error) {
        console.error('Error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
