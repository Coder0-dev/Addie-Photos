const fs = require('fs');
const path = require('path');

const ignoreFolders = ['node_modules', '.git', 'gallery', 'cover-photos'];
const rootDir = process.cwd();

const folders = fs.readdirSync(rootDir).filter(file => {
    const fullPath = path.join(rootDir, file);
    return fs.statSync(fullPath).isDirectory() && !ignoreFolders.includes(file) && !file.startsWith('.');
});

let clientsData = [];

folders.forEach(folder => {
    const folderPath = path.join(rootDir, folder);
    const files = fs.readdirSync(folderPath);
    
    const images = files.filter(file => 
        /\.(jpg|jpeg|png|webp|avif)$/i.test(file) && 
        file.toUpperCase() !== 'COVER-IMAGE.JPG'
    );

    if (images.length > 0) {
        fs.writeFileSync(path.join(folderPath, 'photos.json'), JSON.stringify(images));
        console.log(`Client Gallery Updated: ${folder}/photos.json (${images.length} images)`);
    }

    const infoPath = path.join(folderPath, 'info.txt');
    if (fs.existsSync(infoPath)) {
        const lines = fs.readFileSync(infoPath, 'utf-8').split(/\r?\n/).map(line => line.trim());
        
        clientsData.push({
            id: folder,
            title: lines[0] || 'Unknown Client',
            category: lines[1] || 'Photography',
            fullDate: lines[2] || '',
            shortDate: lines[3] || '',
            password: lines[4] || 'hello'
        });
    }
});

fs.writeFileSync(path.join(rootDir, 'clients.json'), JSON.stringify(clientsData));
console.log(`Master clients.json generated with ${clientsData.length} galleries!`);