import { MongoClient } from 'mongodb';
import {
    connectDatabase,
    insertDocument,
    getAllDocuments,
} from '../../../helpers/db-utils';

async function handler(req, res) {
    const eventId = req.query.commentId;
    let client;

    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
        return;
    }

    if (req.method === 'POST') {
        console.log(req.body);
        const { email, name, text } = req.body;
        if (
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim() === ''
        ) {
            res.status(422).json({ message: 'Invalid input.' });
            return;
        }
        else {
            console.log('success', email, name, text);
            const newCom = {
                email,
                name,
                text,
                eventId
            }

            // const db = client.db();

            // const result = await db.collection('comments').insertOne(newCom)

            let result;

            try {
                result = await insertDocument(client, 'comments', newCom);
                newCom.id = result.insertedId;
                res.status(201).json({ message: 'Added comment.', comment: newCom });
            } catch (error) {
                res.status(500).json({ message: 'Inserting comment failed!' });
            }
        }

        console.log(result);
        // newCom.id = result.insertedId;
        // res.status(201).json({ message: 'success', res: newCom })
    }


    if (req.method === 'GET') {
        console.log('in get method');
        // const db = client.db();

        // const document = await db.collection('comments')
        //     .find({ eventId: eventId })
        //     .sort({ _id: -1 })
        //     .toArray();
        try {
            const documents = await getAllDocuments(client, 'comments', { _id: -1 }, { eventId: eventId });
            res.status(200).json({ comments: documents });
        } catch (error) {
            res.status(500).json({ message: 'Getting comments failed.' });
        }
    }


    // res.status(200).json({ comments: document })

    client.close();
}

export default handler; 