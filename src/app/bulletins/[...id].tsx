import { useEffect, useState } from "react";

// Sample data
const sampleBulletins: BulletinTopic[] = [
    {
        id: "b1",
        title: "Urgent: Update Your Software!",
        createdBy: "Admin",
        createdAt: "2023-04-20",
        priority: Priority.High,
    },
    {
        id: "b2",
        title: "Weekly Sync: Project Phoenix",
        createdBy: "Project Manager",
        createdAt: "2023-04-19",
        priority: Priority.Medium,
    },
    {
        id: "b3",
        title: "Reminder: Timesheet Submission",
        createdBy: "HR",
        createdAt: "2023-04-18",
        priority: Priority.Low,
    },
    // Add up to 20 bulletins with mixed priorities
];

const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const BulletinBoardPage = () => {
    const [bulletins, setBulletins] = useState<BulletinTopic[]>([]);

    useEffect(() => {
        const sortedBulletins = sampleBulletins
            .sort((a, b) => a.priority.localeCompare(b.priority))
            .reduce((acc: BulletinTopic[][], curr) => {
                const index = acc.findIndex(
                    (arr) =>
                        arr.length === 0 || arr[0].priority === curr.priority
                );
                if (index !== -1) {
                    acc[index].push(curr);
                } else {
                    acc.push([curr]);
                }
                return acc;
            }, []);

        sortedBulletins.forEach((group) => shuffleArray(group));

        setBulletins(sortedBulletins.flat());
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
            {bulletins.map((topic) => (
                <div
                    key={topic.id}
                    className={`p-3 rounded shadow hover:shadow-lg transition-shadow duration-300 ease-in-out 
                    ${
                        topic.priority === Priority.High
                            ? "text-xl bg-red-100 hover:bg-red-200"
                            : topic.priority === Priority.Medium
                            ? "text-lg bg-yellow-100 hover:bg-yellow-200"
                            : "text-base bg-green-100 hover:bg-green-200"
                    }`}
                    title={`Created by: ${topic.createdBy} on ${topic.createdAt}`}
                >
                    {topic.title}
                </div>
            ))}
        </div>
    );
};

export default BulletinBoardPage;
