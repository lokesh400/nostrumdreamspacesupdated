const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Nostrum Dream Spaces - Designing Dreams. Building Reality.',
        page: 'home'
    });
});

app.get('/about', (req, res) => {
    res.render('pages/about', { 
        title: 'About Us - Nostrum Dream Spaces',
        page: 'about'
    });
});

app.get('/services', (req, res) => {
    res.render('pages/services', { 
        title: 'Our Services - Nostrum Dream Spaces',
        page: 'services'
    });
});

app.get('/interior-design', (req, res) => {
    res.render('pages/interior-design', { 
        title: 'Interior Design Services - Nostrum Dream Spaces',
        page: 'interior-design'
    });
});

app.get('/exterior-design', (req, res) => {
    res.render('pages/exterior-design', { 
        title: 'Exterior Design Services - Nostrum Dream Spaces',
        page: 'exterior-design'
    });
});

app.get('/construction', (req, res) => {
    res.render('pages/construction', { 
        title: 'Construction & Turnkey Projects - Nostrum Dream Spaces',
        page: 'construction'
    });
});

app.get('/modular-works', (req, res) => {
    res.render('pages/modular-works', { 
        title: 'Modular Works - Nostrum Dream Spaces',
        page: 'modular-works'
    });
});

app.get('/flooring-tiling', (req, res) => {
    res.render('pages/flooring-tiling', { 
        title: 'Flooring & Tiling - Nostrum Dream Spaces',
        page: 'flooring-tiling'
    });
});

app.get('/plumbing-waterproofing', (req, res) => {
    res.render('pages/plumbing-waterproofing', { 
        title: 'Plumbing & Waterproofing - Nostrum Dream Spaces',
        page: 'plumbing-waterproofing'
    });
});

app.get('/soundproofing', (req, res) => {
    res.render('pages/soundproofing', { 
        title: 'Soundproofing Solutions - Nostrum Dream Spaces',
        page: 'soundproofing'
    });
});

app.get('/renovation', (req, res) => {
    res.render('pages/renovation', { 
        title: 'Renovation & Remodeling - Nostrum Dream Spaces',
        page: 'renovation'
    });
});

app.get('/process', (req, res) => {
    res.render('pages/process', { 
        title: 'Our Process - Nostrum Dream Spaces',
        page: 'process'
    });
});

app.get('/portfolio', (req, res) => {
    res.render('pages/portfolio', { 
        title: 'Portfolio - Nostrum Dream Spaces',
        page: 'portfolio'
    });
});

app.get('/testimonials', (req, res) => {
    res.render('pages/testimonials', { 
        title: 'Client Testimonials - Nostrum Dream Spaces',
        page: 'testimonials'
    });
});

app.get('/faq', (req, res) => {
    res.render('pages/faq', { 
        title: 'FAQ - Nostrum Dream Spaces',
        page: 'faq'
    });
});

app.get('/blog', (req, res) => {
    res.render('pages/blog', { 
        title: 'Blog & Insights - Nostrum Dream Spaces',
        page: 'blog'
    });
});

app.get('/contact', (req, res) => {
    res.render('pages/contact', { 
        title: 'Contact Us - Nostrum Dream Spaces',
        page: 'contact'
    });
});

app.get('/quote', (req, res) => {
    res.render('pages/quote', { 
        title: 'Get a Quote - Nostrum Dream Spaces',
        page: 'quote'
    });
});

// Handle quote form submission
app.post('/quote', (req, res) => {
    // Process quote form data here
    console.log('Quote request:', req.body);
    res.redirect('/quote?success=true');
});

// Handle contact form submission
app.post('/contact', (req, res) => {
    // Process contact form data here
    console.log('Contact form:', req.body);
    res.redirect('/contact?success=true');
});

app.listen(PORT, () => {
    console.log(`Nostrum Dream Spaces website running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});