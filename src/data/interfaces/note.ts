export interface Note {
    _id:     string;
    email:   string;
    title:   string;
    content: string;
    date:    string;
    category?: string;
    status?: string;
}