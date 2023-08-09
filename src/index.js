import app from './app.js';
import { connectDB } from './database.js';

connectDB();
app.listen(4500);
console.log('Server on port 4500');