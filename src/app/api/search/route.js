import message_model from '@/models/message_model';
import userM from '@/models/user_model';
import DBconnect from '@/lib/dbConnect';


export async function GET(req, res) {

    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get('tag');
    if (!searchTerm) {
        return new Response(JSON.stringify("need a search term"), { status: 400 })
    }
    if(searchTerm.charAt(0) === '#'){
        searchTerm.slice(1);
    }
    try {
       await DBconnect();
         
        const pipeline = [
            {
                $search: {
                    index: 'Prompt_Search',
                    compound: {
                        must: [
                            {
                                // Main text search with typo tolerance
                                text: {
                                    query: searchTerm,
                                    path: ['title', 'message','tag', 'Cemail'],
                                    fuzzy: {
                                        maxEdits: 2, // Allows for 1 typo
                                        prefixLength: 1,
                                    },
                                },
                            },
                            {
                                // Exact match for tags and email
                                text: {
                                    query: searchTerm,
                                    path: ['tag', 'Cemail'],
                                },
                            },
                        ],
                        must: [
                            {
                                text: {
                                    query: searchTerm,
                                    path: ['title', 'tag'],
                                    score: { boost: { value: 3 } },
                                      fuzzy: { maxEdits: 1 }  // Triple the relevance score
                                },
                            },
                        ],
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    message: 1,
                    tag: 1,
                    Cemail: 1,
                    // Add the relevance score to the output
                    score: { $meta: 'searchScore' },
                },
            },
            
        ];
        const results = await message_model.aggregate(pipeline);
        
        if(results.length === 0){
            return new Response(JSON.stringify("NO RESULTS FOUND"), { status: 404 })
        }
        return new Response(JSON.stringify({final:results}), { status: 200 });

    } catch (err) {
       
        return new Response(JSON.stringify({ message: err.message }), { status: 500 })
    }
}