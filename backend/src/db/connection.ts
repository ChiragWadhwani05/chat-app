import mongoose from 'mongoose';

const connectDB = async () => {
  const url = process.env.DB_URL;
  if (url) {
    try {
      const connection = await mongoose.connect(url, {});
      console.log('\n☘️  MongoDB connected ' + connection.connection.host);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  } else {
    console.log('Faild to connect to MongoDB');
    process.exit(1);
  }
};

export default connectDB;
