import app from './app.js';
import { connectDB } from './database.js';
import { PORT } from './config.js';

connectDB();
app.listen(PORT);
console.log(`Server on port ${PORT}`);
