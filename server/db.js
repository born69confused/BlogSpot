const mongoose = require('mongoose');

// connecting to MongoDB
const db = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_CLOUD, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
		console.log('Database Connected');
	} catch (err) {
		console.log('Database Connection Error', err);
		process.exit(1);
	}
};

module.exports = db;
