import * as fs from 'fs';
import * as path from 'path';

export function getIconData(): Array<{ name: string; code: string; char: string }> {
    const filePath = path.join(__dirname, '../../data/glyphnames.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const jsonData: { [key: string]: { code: string; char: string } } = JSON.parse(data);

    return Object.entries(jsonData)
        .filter(([name]) => name !== 'METADATA')
        .map(([name, { code, char }]) => ({
            name,
            code,
            char,
        }));
}
