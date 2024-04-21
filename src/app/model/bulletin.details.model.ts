interface BulletinDetails {
    id: string;
    title: string;
    topics: BulletinTopic[];
}

interface BulletinTopic {
    id: string;
    title: string;
    createdBy: string;
    createdAt: string;
    priority: Priority;
}

enum Priority {
    High = "HIGH",
    Medium = "MEDIUM",
    Low = "LOW",
}
