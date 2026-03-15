const fs = require('fs');
const path = require('path');

// Folders to skip so we don't accidentally create JSONs in system folders
const ignoreFolders = ['node_modules', '.git', 'gallery', 'cover-photos'];

const rootDir = process.cwd();
const folders = fs.readdirSync(rootDir).filter(file => {
    const fullPath = path.join(rootDir, file);
    return fs.statSync(fullPath).isDirectory() && !ignoreFolders.includes(file) && !file.startsWith('.');
});

folders.forEach(folder => {
    const folderPath = path.join(rootDir, folder);
    const files = fs.readdirSync(folderPath);
    
    // Filter for common image extensions
    const images = files.filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file) && file !== 'cover.jpg');

    if (images.length > 0) {
        fs.writeFileSync(path.join(folderPath, 'photos.json'), JSON.stringify(images));
        console.log(`✅ Client Gallery Updated: ${folder}/photos.json (${images.length} images)`);
    }
});
