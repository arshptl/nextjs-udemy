function handler(req, res) {

    const eventId = req.query.commentId;

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
                id: new Date().toISOString(),
                email,
                name,
                text
            }
            res.status(201).json({ message: 'success', res: newCom })
        }
    }

    if (req.method === 'GET') {
        console.log('in get method');
        const dummyComments = [
            { id: 'c1', name: 'Max', text: 'A first comment' },
            { id: 'c2', name: 'Arsh', text: 'A second comment' }
        ];

        res.status(200).json({comments: dummyComments})
    }
}

export default handler;