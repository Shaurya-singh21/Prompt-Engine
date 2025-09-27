import DBconnect from "@/lib/dbConnect";
import message_model from "@/models/message_model";
export async function PATCH(req, { params }) {
    try {

        const id = params.id;
        const body = await req.json();
        await DBconnect();
        const updated = await message_model.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });
        return new Response(JSON.stringify("updated successfully"), { status: 200 })
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Unable to Update' }, { status: 500 }))
    }
}