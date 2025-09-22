import { json } from "@sveltejs/kit";
import { getBotStatus } from "$lib/server/websocket";

export function GET() {
    return json({
        online: getBotStatus() === "online"
    });
}
