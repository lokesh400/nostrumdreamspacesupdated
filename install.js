// Installation script for Nostrum Dream Spaces website
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏗️  Installing Nostrum Dream Spaces Website...\n');

try {
    // Install dependencies
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    
    // Create additional directories if needed
    const directories = [
        'public/images/hero',
        'public/images/about',
        'public/images/services',
        'public/images/projects',
        'public/images/team',
        'public/images/testimonials'
    ];
    
    directories.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`📁 Created directory: ${dir}`);
        }
    });
    
    console.log('\n✅ Installation completed successfully!');
    console.log('\n🚀 To start the development server:');
    console.log('   npm run dev');
    console.log('\n🌐 The website will be available at: http://localhost:3000');
    
} catch (error) {
    console.error('❌ Installation failed:', error.message);
    process.exit(1);
}