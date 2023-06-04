import path from "path";
import fs from 'fs';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';

const noteDirectory = path.join(process.cwd(), 'notes') ?? '';

export function getAllNoteIds() {
    const fileNames = fs.readdirSync(noteDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            }
        }
    });
};

export async function getNoteData(id: string) {
    const fullPath = path.join(noteDirectory, `${id}.md`);

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
    
    const contentHtml = processedContent.toString();

    const fileIndex = id.replace('note', '');

    return {
        id,
        contentHtml,
        ...matterResult.data,
        fileIndex,
    }
};

export async function getNoteList() {
    const fileNames = fs.readdirSync(noteDirectory);

    const allNotesData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');

        const fullPath = path.join(noteDirectory, fileName);

        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data
        }
    })

    return allNotesData;
}
