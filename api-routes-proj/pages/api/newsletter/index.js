function handler(req, res) {
    if (req.method === 'POST') {
        const email = req.body.email;
        console.log(email);

        res.status(201).json({ message: 'Success!' });
    } else {
        
    }
}

export default handler