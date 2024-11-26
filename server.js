
// // const fs = require('fs');
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const path = require('path');
// // const chalk = require('chalk');

// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // mongoose.connect(process.env.MONGODB_URI)
// //   .then(() => {
// //     console.log(chalk.blue('🔗 Database Connected'));
// //   })
// //   .catch((err) => {
// //     console.error(chalk.red('Connection error:', err));
// //   });

// // const db = mongoose.connection;
// // db.on('error', console.error.bind(console, 'Connection error:'));
// // db.once('open', () => console.log(chalk.green('✅ Connected to MongoDB')));

// // const viewSchema = new mongoose.Schema({
// //     page: String,
// //     views: { type: Number, default: 0 },
// // });
// // const View = mongoose.model('View', viewSchema);

// // app.use('/home', express.static(path.join(__dirname, 'public/home')));

// // app.get('/analytics', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'public', 'analytics', 'analytics.html'));
// // });

// // app.get('/', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'public/home/index.html'));
// // });

// // app.use(express.static(path.join(__dirname, 'public')));


// // app.get('/api/views', async (req, res) => {
// //     try {
// //         const page = req.query.page || 'home';

// //         if (page.includes('.css') || page.includes('.js')) {
// //             return res.status(200).json({ message: 'Ignored CSS/JS file request' });
// //         }

// //         let viewDoc = await View.findOne({ page });
// //         if (!viewDoc) {
// //             viewDoc = new View({ page, views: 1 });
// //         } else {
// //             viewDoc.views += 1;
// //         }
// //         await viewDoc.save();

// //         res.json({ page: viewDoc.page, views: viewDoc.views });
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ error: 'Failed to fetch or update views' });
// //     }
// // });

// // app.get('/api/analytics', async (req, res) => {
// //     try {
// //         const viewDocs = await View.find({ page: { $not: /(\.css|\.js)$/ } });
// //         const analyticsData = {};
// //         viewDocs.forEach(doc => {
// //             analyticsData[doc.page] = doc.views;
// //         });

// //         res.json(analyticsData);
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ error: 'Failed to fetch analytics data' });
// //     }
// // });

// // app.use((req, res, next) => {
// //     res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
// // });

// // app.listen(PORT, () => {
// //     console.log(chalk.yellow(`🚀 Server running on http://localhost:${PORT}`));
// // });

// const fs = require('fs');
// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const chalk = require('chalk');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

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

// const viewSchema = new mongoose.Schema({
//     page: String,
//     views: { type: Number, default: 0 },
// });
// const View = mongoose.model('View', viewSchema);

// app.use('/home', express.static(path.join(__dirname, 'public/home')));

// app.get('/analytics', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'analytics', 'analytics.html'));
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/home/index.html'));
// });

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/api/views', async (req, res) => {
//     try {
//         const page = req.query.page || 'home';

//         if (page.includes('.css') || page.includes('.js')) {
//             return res.status(200).json({ message: 'Ignored CSS/JS file request' });
//         }

//         let viewDoc = await View.findOne({ page });
//         if (!viewDoc) {
//             viewDoc = new View({ page, views: 1 });
//         } else {
//             viewDoc.views += 1;
//         }
//         await viewDoc.save();

//         res.json({ page: viewDoc.page, views: viewDoc.views });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to fetch or update views' });
//     }
// });

// app.get('/api/analytics', async (req, res) => {
//     try {
//         const viewDocs = await View.find({ page: { $not: /(\.css|\.js)$/ } });
//         const analyticsData = {};
//         viewDocs.forEach(doc => {
//             analyticsData[doc.page] = doc.views;
//         });

//         res.json(analyticsData);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to fetch analytics data' });
//     }
// });

// app.use((req, res, next) => {
//     res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
// });

// app.listen(PORT, () => {
//     console.log(chalk.yellow(`🚀 Server running on http://localhost:${PORT}`));
// });

require('dotenv').config();

const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const chalk = require('chalk');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(chalk.blue('🔗 Database Connected'));
  })
  .catch((err) => {
    console.error(chalk.red('Connection error:', err));
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log(chalk.green('✅ Connected to MongoDB')));

const viewSchema = new mongoose.Schema({
    page: String,
    views: { type: Number, default: 0 },
});
const View = mongoose.model('View', viewSchema);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the home page from the root directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve specific files from their subdirectories
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/home/index.html'));
});

app.get('/analytics', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/analytics/analytics.html'));
});

// Add routes for other specific pages if needed
app.get('/page1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/other-pages/page1.html'));
});

app.get('/page2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/other-pages/page2.html'));
});

app.get('/api/views', async (req, res) => {
    try {
        const page = req.query.page || 'home';

        if (page.includes('.css') || page.includes('.js')) {
            return res.status(200).json({ message: 'Ignored CSS/JS file request' });
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

app.get('/api/analytics', async (req, res) => {
    try {
        const viewDocs = await View.find({ page: { $not: /(\.css|\.js)$/ } });
        const analyticsData = {};
        viewDocs.forEach(doc => {
            analyticsData[doc.page] = doc.views;
        });

        res.json(analyticsData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch analytics data' });
    }
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(chalk.yellow(`🚀 Server running on http://localhost:${PORT}`));
});

