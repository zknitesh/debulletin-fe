export interface BulletinDetails {
    id: string;
    title: string;
    topics: BulletinTopic[];
}

export interface BulletinTopic {
    id: string;
    title: string;
    createdBy: string;
    createdAt: string;
    priority: Priority;
}

export enum Priority {
    High = "HIGH",
    Medium = "MEDIUM",
    Low = "LOW",
}
