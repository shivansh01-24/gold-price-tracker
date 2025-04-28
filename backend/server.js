const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const priceRoutes = require('./routes/prices.routes');
const newsRoutes = require('./routes/news.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const { startScraper } = require('./scraper/index');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/prices', priceRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/feedback', feedbackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startScraper(); // Start scraper on server boot
});
