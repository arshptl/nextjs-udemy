import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const email = req.body.email;

        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email address' });
            return;
        }
        console.log(email);

        const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DATABASE_URL_NEWSLETTER);
        const db = client.db(); 
        await db.collection('emails').insertOne({ email: email });
        client.close();

        res.status(201).json({ message: 'Success! You have been signed up.' });
    } else {

    }
}

export default handler