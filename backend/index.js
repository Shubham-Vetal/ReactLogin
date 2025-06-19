
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Use port 5000, or whatever is in .env

// --- Middleware ---
// Enable CORS for all origins (for development, restrict in production)
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

// --- In-memory User Storage (for demonstration purposes only) ---
// In a real application, you would use a database (e.g., MongoDB, PostgreSQL, MySQL)
const users = []; // This will store user objects (id, name, email, passwordHash, phone, company, agency)

// --- Helper function to find a user by email ---
const findUserByEmail = (email) => {
    return users.find(user => user.email === email);
};

// --- Routes ---

// 1. Home/Root Route
app.get('/', (req, res) => {
    res.send('PopX Backend is running!');
});

// 2. Register Route
app.post('/api/register', async (req, res) => {
    const { name, email, password, phone, company, agency } = req.body;

    // Basic validation
    if (!name || !email || !password || !phone || !agency) {
        return res.status(400).json({ success: 'false', error: 'Please fill all required fields.' });
    }

    if (password.length < 8) {
        return res.status(400).json({ success: 'false', error: 'Password must be at least 8 characters long.' });
    }

    // Check if user already exists
    if (findUserByEmail(email)) {
        return res.status(409).json({ success: 'false', error: 'User with this email already exists.' });
    }
    

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create new user object
        const newUser = {
            id: users.length + 1, // Simple ID generation
            name,
            email,
            phone,
            company: company || '', // Company can be optional
            agency,
            passwordHash // Store the hashed password
        };

        users.push(newUser); // Add user to our in-memory storage

        // Respond with success and non-sensitive user data
        res.status(201).json({
            success: 'true',
            message: 'User registered successfully!',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                company: newUser.company,
                agency: newUser.agency
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: 'false', error: 'Server error during registration.' });
    }
});

// 3. Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ success: 'false', error: 'Please enter email and password.' });
    }

    // Find user
    const user = findUserByEmail(email);
    if (!user) {
        return res.status(400).json({ success: 'false', error: 'Invalid credentials.' });
    }

    try {
        // Compare provided password with stored hash
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ success: 'false', error: 'Invalid credentials.' });
        }

        // Login successful - send non-sensitive user data
        res.status(200).json({
            success: 'true',
            message: 'Logged in successfully!',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                company: user.company,
                agency: user.agency
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: 'false', error: 'Server error during login.' });
    }
});

// 4. Protected Profile Route (Example - typically needs authentication middleware)
// In a real app, you'd add middleware here to verify a JWT token before proceeding.
app.get('/api/profile', (req, res) => {
    // For this simple example, we'll just return a generic message or dummy data.
    // In a real app, you'd extract user info from an auth token.
    res.status(200).json({
        success: 'true',
        message: 'Welcome to your profile!',
        data: {
            // This would be the actual user data from the authenticated session
            name: 'Authenticated User',
            email: 'user@example.com',
            info: 'This data is from a protected route.'
        }
    });
});


// --- Start the server ---
app.listen(PORT, () => {
    console.log(`PopX Backend server running on http://localhost:${PORT}`);
    console.log('Registered users:', users); // For debugging
});

// To enable 'import' statements (ES Modules) in Node.js,
// add "type": "module" to your package.json file.