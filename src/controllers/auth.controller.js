const {PrismaClient} = require('@prisma/client');

const bycrypt = require('bcryptjs'); // Assuming you have bcryptjs installed for password hashing
const jwt = require('jsonwebtoken'); // Assuming you have jsonwebtoken installed for token generation

const prisma = new PrismaClient(); // Importing the Prisma client

const JWT_SECRET = process.env.JWT_SECRET; // Use an environment variable for the secret key
if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not defined in .env');

exports.register = async (req, res) => {

    const { username, email, password } = req.body;

    try {

        const existingUser = await prisma.user.findUnique({ where: { email }});

        if (existingUser) return res.status(400).json({ message: "An account with this email already exists." });

        const hashedPassword = await bycrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role: 'READER' // Default role
            }
        });

        res.status(201).json({ message: "User registered successfully"});
    } catch (error) {
        res.status(500).json({ message: "An error occurred while registering the user.", error: error.message });
    }
};

exports.login = async (req, res) => {
    const {email, password} = req.body;

    try{

        // Check if entered user email match a user that exists
        const user = await prisma.user.findUnique({ where: { email } });
        if(!user) return res.status(404).json({ message: "User not found." });


        // Check if entered password match the user password
        const isValid = await bycrypt.compare(password, user.password);
        if(!isValid) return res.status(401).json({ message: "Invalid Password"});


        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({message: "You are now connected", token, user: { id: user.id, username: user.username, email: user.email, role: user.role, isSubscribed: user.isSubscribed }});

    } catch (error) {
        res.status(500).json({ message: "An error occurred while logging in. Retry or Contact support", error: error.message });
    }
};