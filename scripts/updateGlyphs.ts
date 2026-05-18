import * as fs from 'fs';
import * as path from 'path';

const url =
    'https://raw.githubusercontent.com/ryanoasis/nerd-fonts/master/glyphnames.json';
const filePath = path.join(__dirname, '../data/glyphnames.json');

interface GlyphData {
    METADATA: {
        website: string;
        'development-website': string;
        version: string;
        date: string;
    };
    [key: string]: any;
}

async function updateGlyphs(): Promise<void> {
    console.log(`Fetching glyph names from ${url}...`);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = (await response.json()) as GlyphData;

        const dataDir = path.dirname(filePath);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, {recursive: true});
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Successfully updated ${filePath}`);
    } catch (error: any) {
        console.error('Error updating glyph names:', error.message);
        process.exit(1);
    }
}

updateGlyphs();
