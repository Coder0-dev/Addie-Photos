const fs = require('fs');
const path = require('path');

// This finds the exact folder where THIS script is sitting (the /gallery folder)
const galleryDir = __dirname;
const imageDir = path.join(galleryDir, 'images');

try {
    const files = fs.readdirSync(imageDir);
    // Filter for images
    const images = files.filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file));
    
    // Save the photos.json inside the /gallery folder
    fs.writeFileSync(path.join(galleryDir, 'photos.json'), JSON.stringify(images));
    
    console.log(`✅ Success! Found ${images.length} images in /gallery/images/`);
} catch (err) {
    console.error("❌ Error: Could not find the images folder. Check your structure!", err);
}
