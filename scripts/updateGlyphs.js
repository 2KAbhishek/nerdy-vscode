const fs = require('fs');
const path = require('path');

const url = "https://raw.githubusercontent.com/ryanoasis/nerd-fonts/master/glyphnames.json";
const filePath = path.join(__dirname, '../data/glyphnames.json');

async function updateGlyphs() {
    console.log(`Fetching glyph names from ${url}...`);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();

        const dataDir = path.dirname(filePath);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Successfully updated ${filePath}`);
    } catch (error) {
        console.error('Error updating glyph names:', error.message);
        process.exit(1);
    }
}

updateGlyphs();
