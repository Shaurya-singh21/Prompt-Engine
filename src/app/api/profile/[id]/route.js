
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import message_model from '@/models/message_model';
import userM from '@/models/user_model';
import DBconnect from '@/lib/dbConnect';

export const DELETE = async (req, { params }) => {
   const session = await mongoose.startSession();
   const serverSession = await getServerSession(authOptions);

   try {
      session.startTransaction();
      await DBconnect();
      const { id } = await params;


      const final = await message_model.deleteOne(
         { _id: id,creator: serverSession.user.id },
         { session }
      );


      if (final.deletedCount === 0) {
         await session.abortTransaction();
         return new Response(JSON.stringify({ message: "Message not found" }), { status: 404 });
      }


      await userM.findByIdAndUpdate(
         serverSession.user.id,
         {
            $pull: { prompts: id },
            $inc: { totalPrompts: -1 },
         },
         { session }
      );

      await session.commitTransaction();

      return new Response(JSON.stringify({ message: "Successfully deleted" }), { status: 200 });

   } catch (err) {
      await session.abortTransaction();
     
      return new Response(JSON.stringify({ message: "Error deleting message" }), { status: 500 });
   } finally {

      session.endSession();
   }
};
