export interface Language {
    name: string;
    flag: string;
}

export interface Languages {
    [key: string | number]: Language;
}