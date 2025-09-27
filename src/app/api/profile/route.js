import DBconnect from "@/lib/dbConnect";
import user_model from "@/models/user_model";
import { getServerSession } from 'next-auth/next';
import {authOptions}  from "../auth/[...nextauth]/route";
import message_model from "@/models/message_model";


export async function GET(req) {
    try{
        const session = await getServerSession(authOptions);
        if(!session || !session.user){
            return new Response(JSON.stringify({error: "Unauthorized"}), {status: 401});
        }
        await DBconnect();
        const user = await user_model.findById(session.user.id).populate("prompts");
        if(!user || user.length === 0){
            return new Response(JSON.stringify({error: "User not found"}), {status: 404});
        }
        return new Response(JSON.stringify({user}), {status: 200,headers:{'Content-Type': 'application/json'}})
    }catch(err){
        console.log(err)
        return new Response(JSON.stringify({error: err.message}), {status: 500});
    
    }
}