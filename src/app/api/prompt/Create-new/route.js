import DBconnect from "@/lib/dbConnect";
import message_model from "@/models/message_model";
import userM from "@/models/user_model";

export const POST = async (req, res) => {
  const { userId, message, tag, title, Cemail } = await req.json();
  try {
    if (!userId || !message || !title || !tag || !Cemail) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }
    await DBconnect();
    const newPrompt = await message_model.create({
      creator: userId,
      message,
      tag,
      title,
      Cemail,
    })
    await userM.findByIdAndUpdate(userId, {
      $inc: { totalPrompts: 1 },
    });
    await userM.findByIdAndUpdate(userId, {
      $push: { prompts: newPrompt._id }
    })
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {

    return new Response(JSON.stringify({ error: "Failed to create prompt" }), { status: 500 });
  }
}