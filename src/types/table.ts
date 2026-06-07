export interface TableData {
    id: number;
    type: string;
    category: string;
    color: string;
    status: number;
    position: {
        x: number;
        y: number;
    }
    "isLocked": boolean;
}

export interface TableEditForm {
    type: string, 
    category: string, 
    color: string, 
    status: number, 
    isLocked: boolean
}