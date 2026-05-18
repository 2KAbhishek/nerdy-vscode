import * as fs from 'fs';
import * as path from 'path';

export interface Icon {
    name: string;
    code: string;
    char: string;
}

let cachedIconData: Icon[] | null = null;

export function getIconData(): Icon[] {
    if (cachedIconData) {
        return cachedIconData;
    }

    const filePath = path.join(__dirname, '../../data/glyphnames.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const jsonData: {[key: string]: {code: string; char: string}} =
        JSON.parse(data);

    cachedIconData = Object.entries(jsonData)
        .filter(([name]) => name !== 'METADATA')
        .map(([name, {code, char}]) => ({
            name,
            code,
            char
        }));

    return cachedIconData;
}
