import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const { action } = await request.json();

    const res = await fetch(`https://control.novonode.com/api/client/servers/${process.env.NOVO_API_SERVERID}/power`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.NOVO_APIKEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action })
    });

    const data = await res.json();
    return json(data);
}
