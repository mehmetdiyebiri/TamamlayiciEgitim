import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function getExactBrandLogoSvg({ width, height, isOg = false, isSquare = false }) {
  let viewBox = "0 0 1000 700";
  let markY = 240;
  let markScale = 1.0;
  let textY1 = 540;
  let textY2 = 615;
  let fontSize1 = 60;
  let fontSize2 = 29;
  let letterSpacing2 = 9;

  if (isOg) {
    // 1200x630 OpenGraph / Social preview card
    // Central safe zone for WhatsApp square thumbnail crop (x: 285..915)
    viewBox = "0 0 1200 630";
    markY = 205;
    markScale = 0.95;
    textY1 = 485;
    textY2 = 550;
    fontSize1 = 58;
    fontSize2 = 28;
    letterSpacing2 = 8;
  } else if (isSquare) {
    // 800x800 square for avatars, app icons and WhatsApp square preview
    viewBox = "0 0 800 800";
    markY = 310;
    markScale = 1.05;
    textY1 = 620;
    textY2 = 690;
    fontSize1 = 54;
    fontSize2 = 26;
    letterSpacing2 = 7;
  }

  const cx = isOg ? 600 : (isSquare ? 400 : 500);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}">
  <defs>
    <!-- Left pages (deep blues) -->
    <linearGradient id="pLeftOuter" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#003e82" />
      <stop offset="100%" stop-color="#012b5c" />
    </linearGradient>
    <linearGradient id="pLeftMid" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#025cb0" />
      <stop offset="100%" stop-color="#004386" />
    </linearGradient>
    <linearGradient id="pLeftInner" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1476cb" />
      <stop offset="100%" stop-color="#025aa9" />
    </linearGradient>

    <!-- Right pages (lighter vibrant blues) -->
    <linearGradient id="pRightInner" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b91db" />
      <stop offset="100%" stop-color="#2478c5" />
    </linearGradient>
    <linearGradient id="pRightMid" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5fa7e4" />
      <stop offset="100%" stop-color="#3d8fd7" />
    </linearGradient>
    <linearGradient id="pRightOuter" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7ebcee" />
      <stop offset="100%" stop-color="#5ca6e4" />
    </linearGradient>

    <!-- Top covers angled back -->
    <linearGradient id="topCoverLeft" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#002d64" />
      <stop offset="100%" stop-color="#024d96" />
    </linearGradient>
    <linearGradient id="topCoverRight" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3283cc" />
      <stop offset="100%" stop-color="#69b0eb" />
    </linearGradient>
  </defs>

  <!-- Crisp Pure White Background -->
  <rect width="100%" height="100%" fill="#ffffff" />

  <!-- Center Group: 3D Open Book Geometric 'M' Motif -->
  <g transform="translate(${cx}, ${markY}) scale(${markScale})">
    <!-- Back Cover Left Top Angled Rim -->
    <polygon points="-190,-165 -60,-225 -60,-205 -190,-145" fill="url(#topCoverLeft)" />
    <!-- Back Cover Right Top Angled Rim -->
    <polygon points="60,-225 190,-165 190,-145 60,-205" fill="url(#topCoverRight)" />

    <!-- Left Outer Flap (Darkest Blue) -->
    <polygon points="-245,-140 -185,-170 -185,150 -245,180" fill="url(#pLeftOuter)" />
    <!-- Left Mid Section -->
    <polygon points="-185,-170 -120,-140 -120,60 -185,25" fill="url(#pLeftMid)" />
    <!-- Left Inner Facet & Center V-cutout -->
    <polygon points="-120,-140 -60,-170 -60,15 -120,60" fill="url(#pLeftInner)" />
    <polygon points="-185,25 -120,60 0,-30 0,-95 -120,-10" fill="#00356e" />
    <polygon points="0,-95 0,-30 120,60 185,25 120,-10" fill="#297dc9" />

    <!-- Left Lower Spine -->
    <polygon points="-60,15 0,45 0,165 -60,135" fill="#014a94" />
    <!-- Right Lower Spine -->
    <polygon points="0,45 60,15 60,135 0,165" fill="#3283cc" />

    <!-- Right Inner Facet & Center V-cutout -->
    <polygon points="60,-170 120,-140 120,60 60,15" fill="url(#pRightInner)" />
    <!-- Right Mid Section -->
    <polygon points="120,-140 185,-170 185,25 120,60" fill="url(#pRightMid)" />
    <!-- Right Outer Flap (Lightest Vibrant Blue) -->
    <polygon points="185,-170 245,-140 245,180 185,150" fill="url(#pRightOuter)" />

    <!-- Inner Book V-crease shadow line -->
    <line x1="0" y1="-95" x2="0" y2="165" stroke="#ffffff" stroke-width="4" stroke-opacity="0.8" />
  </g>

  <!-- Typography matching exact brand logotype -->
  <g text-anchor="middle">
    <!-- MAARİF MERKEZİ.COM -->
    <text x="${cx}" y="${textY1}" 
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" 
          font-size="${fontSize1}" 
          font-weight="900" 
          letter-spacing="3.5" 
          fill="#002d64">
      MAARİF MERKEZİ.COM
    </text>

    <!-- EĞİTİM VE GELİŞİM PLATFORMU -->
    <text x="${cx}" y="${textY2}" 
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" 
          font-size="${fontSize2}" 
          font-weight="700" 
          letter-spacing="${letterSpacing2}" 
          fill="#1f6ca8">
      EĞİTİM VE GELİŞİM PLATFORMU
    </text>
  </g>
</svg>`;
}

async function run() {
  console.log("Generating brand assets with ONLY official project logo...");

  // 1. Primary OpenGraph image (1200x630)
  const ogSvg = getExactBrandLogoSvg({ width: 1200, height: 630, isOg: true });
  const ogBuffer = await sharp(Buffer.from(ogSvg))
    .png({ quality: 90, compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogBuffer);
  console.log('Saved public/og-image.png:', ogBuffer.length, 'bytes');

  // 2. Square Logo (800x800) for avatars and WhatsApp thumbnail
  const squareSvg = getExactBrandLogoSvg({ width: 800, height: 800, isSquare: true });
  const logoBuffer = await sharp(Buffer.from(squareSvg))
    .resize(800, 800)
    .png({ quality: 90, compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'logo.png'), logoBuffer);
  fs.writeFileSync(path.join(publicDir, 'maarif-logo.png'), logoBuffer);
  console.log('Saved public/logo.png & public/maarif-logo.png:', logoBuffer.length, 'bytes');

  // 3. Vector Logo (1000x700)
  const vectorSvg = getExactBrandLogoSvg({ width: 1000, height: 700 });
  fs.writeFileSync(path.join(publicDir, 'logo.svg'), vectorSvg, 'utf8');
  console.log('Saved public/logo.svg');

  // 4. Favicon (64x64) and Apple Touch Icon (180x180)
  const favBuffer = await sharp(Buffer.from(squareSvg))
    .resize(64, 64)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), favBuffer);

  const appleBuffer = await sharp(Buffer.from(squareSvg))
    .resize(180, 180)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleBuffer);
  console.log('All brand logo assets successfully generated!');
}

run().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
