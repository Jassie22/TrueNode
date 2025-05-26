const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Simple gzip compression function
function gzipFile(filePath) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(filePath + '.gz');
    const gzip = zlib.createGzip({ level: 9 });
    
    readStream
      .pipe(gzip)
      .pipe(writeStream)
      .on('finish', () => {
        const originalSize = fs.statSync(filePath).size;
        const compressedSize = fs.statSync(filePath + '.gz').size;
        const ratio = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
        console.log(`✅ ${path.basename(filePath)}: ${originalSize} → ${compressedSize} bytes (${ratio}% reduction)`);
        resolve();
      })
      .on('error', reject);
  });
}

// Find files to compress
function findFilesToCompress(dir) {
  const files = [];
  const extensions = ['.html', '.css', '.js', '.json'];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (extensions.includes(ext) && stat.size > 1024) { // Only compress files > 1KB
          files.push(fullPath);
        }
      }
    }
  }
  
  traverse(dir);
  return files;
}

// Main compression function
async function compressFiles() {
  const outDir = path.join(process.cwd(), 'out');
  
  if (!fs.existsSync(outDir)) {
    console.log('❌ Output directory not found. Run "npm run build" first.');
    return;
  }
  
  console.log('🗜️  Starting gzip compression...\n');
  
  const filesToCompress = findFilesToCompress(outDir);
  console.log(`📁 Found ${filesToCompress.length} files to compress\n`);
  
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  
  for (const filePath of filesToCompress) {
    try {
      const originalSize = fs.statSync(filePath).size;
      totalOriginalSize += originalSize;
      
      await gzipFile(filePath);
      totalCompressedSize += fs.statSync(filePath + '.gz').size;
      
    } catch (error) {
      console.error(`❌ Error compressing ${filePath}:`, error.message);
    }
  }
  
  console.log('\n📊 Compression Summary:');
  console.log(`Original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Gzip size: ${(totalCompressedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total reduction: ${((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(2)}%`);
  console.log('\n✨ Gzip compression complete!');
}

// Run compression
compressFiles().catch(console.error); 