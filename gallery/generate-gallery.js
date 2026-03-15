const fs = require('fs');
const path = require('path');

const galleryDir = path.join(process.cwd(), 'gallery');
const imageDir = path.join(galleryDir, 'images');
const outputPath = path.join(galleryDir, 'photos.json');

try {
    if (!fs.existsSync(imageDir)) {
        console.error("Error: Images folder not found at " + imageDir);
        process.exit(1);
    }

    const files = fs.readdirSync(imageDir);
    const images = files.filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file));
    
    fs.writeFileSync(outputPath, JSON.stringify(images));
    
    console.log(`Success! Created ${outputPath} with ${images.length} images.`);
} catch (err) {
    console.error("Build Script Failed:", err);
    process.exit(1);
}