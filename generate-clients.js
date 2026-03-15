const fs = require('fs');
const path = require('path');

// Folders to skip
const ignoreFolders = ['node_modules', '.git', 'gallery', 'cover-photos'];

const rootDir = process.cwd();
const folders = fs.readdirSync(rootDir).filter(file => {
    const fullPath = path.join(rootDir, file);
    return fs.statSync(fullPath).isDirectory() && !ignoreFolders.includes(file) && !file.startsWith('.');
});

folders.forEach(folder => {
    const folderPath = path.join(rootDir, folder);
    const files = fs.readdirSync(folderPath);
    
    // Filter images, but EXCLUDE the specific COVER-IMAGE.jpg
    const images = files.filter(file => 
        /\.(jpg|jpeg|png|webp|avif)$/i.test(file) && 
        file.toUpperCase() !== 'COVER-IMAGE.JPG'
    );

    if (images.length > 0) {
        fs.writeFileSync(path.join(folderPath, 'photos.json'), JSON.stringify(images));
        console.log(`✅ Client Gallery Updated: ${folder}/photos.json (${images.length} images)`);
    }
});
