import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		await mongoose.connect('mongodb+srv://odsadmin:odsadmin129@company.hnbpcgq.mongodb.net/prueba');
		console.log('Database is connected');
	} catch (error) {
		console.log(error);
	}
};
