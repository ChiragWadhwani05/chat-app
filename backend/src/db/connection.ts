import mongoose from 'mongoose';

// Extend the ConnectOptions interface
declare module 'mongoose' {
  interface ConnectOptions {
    useUnifiedTopology?: boolean;
    useNewUrlParser?: boolean;
  }
}
const connectDB = async () => {
  const url = process.env.DB_URL;
  if (url) {
    try {
      const connection = await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      console.log('\n☘️ MongoDB connected ' + connection.connection.host);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Faild to connect to MongoDB');
  }
};

export default connectDB;
