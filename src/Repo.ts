export class Repo {
    name: string;
    language: string;
    size: number;
    description: string

    constructor(repo: any) {
        this.name = repo.name;
        this.language = repo.language;
        this.size = repo.size;
        this.description = repo.description
    }
}