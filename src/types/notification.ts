type notification = {
    id: number;
    title: string;
    description: string;
    date?: string; // Optional field for date
    time?: string; // Optional field for time
    isRead?: boolean; // Optional field to indicate if the notification has been read
};

export type { notification };