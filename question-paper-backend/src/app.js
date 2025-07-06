require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./cron/cleanupJob');

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
  credentials: true                // allow cookies
}));


app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/qps', require('./routes/qp.routes'));
app.use('/api/subjects', require('./routes/SubjectRoutes'));
app.use('/api/llm', require('./routes/llmRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
