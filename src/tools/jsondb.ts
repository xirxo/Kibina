import { readFile, writeFile } from 'fs/promises';

export class DB {
    private file: string;

    constructor(file: string) {
        if (!file.endsWith('.json')) {
            throw new Error('File must end with a \'.json\'')
        }

        this.file = file;
    }

    private async write(data: Record<string, unknown>): Promise<this> {
        try {
            await writeFile(this.file, JSON.stringify(data));
            return Promise.resolve(this);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    private async read(): Promise<Record<string, unknown>> {
        try {
            const data = await readFile(this.file);
            return Promise.resolve(JSON.parse(data.toString()));
        } catch (err) {
            return Promise.reject(err);
        }
    }

    public async get(key: string): Promise<Record<string, unknown | undefined> | (unknown | undefined)> {
        try {
            const data = await this.read();

            if (data[key]) {
                return Promise.resolve(data[key]);
            }

            else {
                return Promise.resolve(undefined);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }

    public async set(key: string, value: unknown): Promise<string | undefined> {
        try {
            const data = await this.read();
            data[key] = value;

            await this.write(data);
            return Promise.resolve(JSON.stringify(data));
        } catch (err) {
            Promise.reject(err);
        }
    }

    public async clear(key?: string): Promise<void> {
        if (key) (await this.set(key, ''));
        else this.write({});
    }
}