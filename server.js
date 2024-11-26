// require('dotenv').config();

// const fs = require('fs');
// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const chalk = require('chalk');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log(chalk.blue('🔗 Database Connected'));
//   })
//   .catch((err) => {
//     console.error(chalk.red('Connection error:', err));
//   });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', () => console.log(chalk.green('✅ Connected to MongoDB')));

// // MongoDB Schema and Model
// const viewSchema = new mongoose.Schema({
//   page: String,
//   views: { type: Number, default: 0 },
// });
// const View = mongoose.model('View', viewSchema);

// // Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Home route
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Routes for mental illness pages
// app.get('/mentalillness/schizophrenia.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/schizophrenia/index.html'));
// });

// app.get('/mentalillness/depression.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/depression/index.html'));
// });

// app.get('/mentalillness/ocd.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/ocd/index.html'));
// });

// app.get('/mentalillness/ptsd.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/ptsd/index.html'));
// });

// app.get('/mentalillness/gad.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/gad/index.html'));
// });

// app.get('/mentalillness/pd.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/pd/index.html'));
// });

// // Analytics API for page views
// app.get('/api/views', async (req, res) => {
//   try {
//     const page = req.query.page || 'home';

//     if (page.includes('.css') || page.includes('.js')) {
//       return res.status(200).json({ message: 'Ignored CSS/JS file request' });
//     }

//     let viewDoc = await View.findOne({ page });
//     if (!viewDoc) {
//       viewDoc = new View({ page, views: 1 });
//     } else {
//       viewDoc.views += 1;
//     }
//     await viewDoc.save();

//     res.json({ page: viewDoc.page, views: viewDoc.views });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch or update views' });
//   }
// });

// // API to fetch analytics data
// app.get('/api/analytics', async (req, res) => {
//   try {
//     const viewDocs = await View.find({ page: { $not: /(\.css|\.js)$/ } });
//     const analyticsData = {};
//     viewDocs.forEach((doc) => {
//       analyticsData[doc.page] = doc.views;
//     });

//     res.json(analyticsData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch analytics data' });
//   }
// });

// // Custom 404 page
// app.use((req, res, next) => {
//   res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(chalk.yellow(`🚀 Server running on http://localhost:${PORT}`));
// });


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const chalk = require('chalk');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(chalk.blue('🔗 Database Connected')))
  .catch((err) => console.error(chalk.red('Connection error:', err)));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log(chalk.green('✅ MongoDB connection established')));

// MongoDB Schema and Model
const viewSchema = new mongoose.Schema({
  page: String,
  views: { type: Number, default: 0 },
});
const View = mongoose.model('View', viewSchema);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Mental illness pages
const mentalIllnessPages = [
  'schizophrenia',
  'depression',
  'ocd',
  'ptsd',
  'gad',
  'pd',
];

mentalIllnessPages.forEach((page) => {
  app.get(`/mentalillness/${page}`, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', page, 'index.html'));
  });
});

// Analytics API for page views
app.get('/api/views', async (req, res) => {
  try {
    const page = req.query.page || 'home';
    if (page.includes('.css') || page.includes('.js')) {
      return res.status(200).json({ message: 'Ignored CSS/JS request' });
    }

    let viewDoc = await View.findOne({ page });
    if (!viewDoc) {
      viewDoc = new View({ page, views: 1 });
    } else {
      viewDoc.views += 1;
    }
    await viewDoc.save();
    res.json({ page: viewDoc.page, views: viewDoc.views });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch or update views' });
  }
});

// API to fetch analytics data
app.get('/api/analytics', async (req, res) => {
  try {
    const viewDocs = await View.find({ page: { $not: /(\.css|\.js)$/ } });
    const analyticsData = {};
    viewDocs.forEach((doc) => {
      analyticsData[doc.page] = doc.views;
    });
    res.json(analyticsData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

// Custom 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(chalk.yellow(`🚀 Server running on http://localhost:${PORT}`));
});
