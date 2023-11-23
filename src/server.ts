import mongoose from 'mongoose';
import { DB_URI, PORT } from './app/config';
import app from './app';

const port = PORT || 5000;
const db_uri = DB_URI || 'mongodb://localhost:27017/apollo-assignment-2';

// connect DB and start server
(async () => {
  try {
    await mongoose.connect(db_uri);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
