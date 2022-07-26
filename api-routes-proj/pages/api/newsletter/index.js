import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const email = req.body.email;

        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email address' });
            return;
        }
        console.log(email);

        const client = await MongoClient.connect('mongodb+srv://harshptl14:h4rshptl14@cluster0.0wma2wa.mongodb.net/newsletter?retryWrites=true&w=majority');
        // .then(
        //     client => {
        //         const db = client.db();
        //         return db.collection('emails').insertOne({ email: email });
        //     }
        // )
        const db = client.db(); 
        await db.collection('emails').insertOne({ email: email });
        client.close();

        res.status(201).json({ message: 'Success! You have been signed up.' });
    } else {

    }
}

export default handler