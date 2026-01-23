const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

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
        description: 'Premium Interior Design, Exterior Design, Construction & Turnkey Solutions in Haryana. Transform your spaces with our expert design and construction services.',
        keywords: 'interior design Haryana, exterior design, construction services, turnkey projects, modular kitchen, home renovation Palwal',
        page: 'pages/home',
        currentUrl: '/'
    });
});

app.get('/about', (req, res) => {
    res.render('pages/about', {
        title: 'About Us - Nostrum Dream Spaces | Premium Design & Construction',
        description: 'Learn about Nostrum Dream Spaces - a leading interior design and construction company in Haryana with 2+ years of excellence in creating exceptional spaces.',
        keywords: 'about nostrum dream spaces, interior design company Haryana, construction company Palwal, design team',
        page: 'pages/about',
        currentUrl: '/about'
    });
});

app.get('/services', (req, res) => {
    res.render('services', {
        title: 'Our Services - Interior Design, Construction & Turnkey Solutions',
        description: 'Comprehensive design and construction services including interior design, exterior design, modular works, flooring, plumbing, and complete turnkey solutions.',
        keywords: 'interior design services, construction services, modular kitchen, flooring, plumbing, turnkey projects Haryana Palwal',
        page: 'pages/services',
        currentUrl: '/services'
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
        title: 'Portfolio - Our Projects | Nostrum Dream Spaces',
        description: 'Explore our portfolio of completed interior design and construction projects in Haryana. Residential and commercial project showcase with luxury designs.',
        keywords: 'design portfolio, interior design projects Haryana, construction projects Palwal, completed projects, luxury interiors, commercial design',
        page: 'pages/portfolio',
        currentUrl: '/portfolio'
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
        title: 'Contact Us - Get in Touch | Nostrum Dream Spaces',
        description: 'Contact Nostrum Dream Spaces for your interior design and construction needs in Haryana. Get free consultation and quotes.',
        keywords: 'contact interior designer Haryana, construction company contact Palwal, design consultation, free quote',
        page: 'pages/contact',
        currentUrl: '/contact'
    });
});

app.get('/quote', (req, res) => {
    res.render('pages/quote', {
        title: 'Get Free Quote - Interior Design & Construction | Nostrum Dream Spaces',
        description: 'Get a free detailed quote for your interior design or construction project. Quick response within 24 hours with transparent pricing.',
        keywords: 'free interior design quote, construction quote Mumbai, design estimate, project cost',
        page: 'pages/quote',
        currentUrl: '/quote'
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