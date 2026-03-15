const fs = require('fs');
const path = require('path');

// Add the names of your client folders here as you create them
const clientFolders = ['hayden-megan', 'storlie-family', 'shaffer-sisters'];

clientFolders.forEach(folder => {
    const targetDir = path.join(process.cwd(), folder);
    const outputPath = path.join(targetDir, 'photos.json');

    try {
        // Skip if the folder doesn't exist yet (prepares you for future clients)
        if (!fs.existsSync(targetDir)) {
            console.log(`⏳ Skipping ${folder}: Folder not created yet.`);
            return; 
        }

        const files = fs.readdirSync(targetDir);
        // Filter out non-image files
        const images = files.filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file));
        
        fs.writeFileSync(outputPath, JSON.stringify(images));
        
        console.log(`✅ Success! Created photos.json in /${folder} with ${images.length} images.`);
    } catch (err) {
        console.error(`❌ Failed processing /${folder}:`, err);
    }
});
