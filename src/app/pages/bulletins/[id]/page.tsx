"use client";
import { useEffect, useState } from "react";
import { BulletinTopic, Priority } from "../../../model/bulletin.details.model";

// Sample data
const sampleBulletins: BulletinTopic[] = [
    {
        id: "b1",
        title: "Emergency System Maintenance Tonight",
        createdBy: "IT Department",
        createdAt: "2023-04-20",
        priority: Priority.High,
    },
    {
        id: "b2",
        title: "Quarterly All-Hands Meeting Next Week",
        createdBy: "CEO",
        createdAt: "2023-04-19",
        priority: Priority.Medium,
    },
    {
        id: "b3",
        title: "New Office Safety Protocols Released",
        createdBy: "Facilities",
        createdAt: "2023-04-18",
        priority: Priority.Low,
    },
    {
        id: "b4",
        title: "Updated Project Delivery Schedule",
        createdBy: "Project Management",
        createdAt: "2023-04-17",
        priority: Priority.Medium,
    },
    {
        id: "b5",
        title: "Critical Security Update Required",
        createdBy: "Security Team",
        createdAt: "2023-04-16",
        priority: Priority.High,
    },
    {
        id: "b6",
        title: "Staff Social Event This Friday",
        createdBy: "HR Department",
        createdAt: "2023-04-15",
        priority: Priority.Low,
    },
    {
        id: "b7",
        title: "Reminder: Submit Your Vacation Plans",
        createdBy: "HR Department",
        createdAt: "2023-04-14",
        priority: Priority.Low,
    },
    {
        id: "b8",
        title: "Client Feedback Collection",
        createdBy: "Customer Service",
        createdAt: "2023-04-13",
        priority: Priority.Medium,
    },
    {
        id: "b9",
        title: "Important Update to Email Policies",
        createdBy: "IT Security",
        createdAt: "2023-04-12",
        priority: Priority.High,
    },
    {
        id: "b10",
        title: "Schedule for Next Week's Training Sessions",
        createdBy: "Training Department",
        createdAt: "2023-04-11",
        priority: Priority.Medium,
    },
    {
        id: "b11",
        title: "Annual Budget Review Meeting",
        createdBy: "Finance Department",
        createdAt: "2023-04-10",
        priority: Priority.Medium,
    },
    {
        id: "b12",
        title: "Updated Health Benefits Information",
        createdBy: "HR Department",
        createdAt: "2023-04-09",
        priority: Priority.Low,
    },
    {
        id: "b13",
        title: "Emergency Contact Information Update",
        createdBy: "Facilities",
        createdAt: "2023-04-08",
        priority: Priority.High,
    },
    {
        id: "b14",
        title: "Reminder: Office Closure Next Friday",
        createdBy: "Operations",
        createdAt: "2023-04-07",
        priority: Priority.Medium,
    },
    {
        id: "b15",
        title: "New Compliance Training Modules Available",
        createdBy: "Compliance Department",
        createdAt: "2023-04-06",
        priority: Priority.Low,
    },
    {
        id: "b16",
        title: "IT Service Desk Hours Extended",
        createdBy: "IT Department",
        createdAt: "2023-04-05",
        priority: Priority.Medium,
    },
    {
        id: "b17",
        title: "Urgent: Phishing Alert - Do Not Open Suspicious Emails",
        createdBy: "IT Security",
        createdAt: "2023-04-04",
        priority: Priority.High,
    },
    {
        id: "b18",
        title: "New Parking Arrangements",
        createdBy: "Facilities Management",
        createdAt: "2023-04-03",
        priority: Priority.Low,
    },
    {
        id: "b19",
        title: "CEO Town Hall: Vision for the Next Quarter",
        createdBy: "CEO",
        createdAt: "2023-04-02",
        priority: Priority.Medium,
    },
    {
        id: "b20",
        title: "Final Reminder: Employee Satisfaction Survey",
        createdBy: "HR Department",
        createdAt: "2023-04-01",
        priority: Priority.Low,
    },
];

const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const BulletinBoardPage = ({ params }: { params: { id: string } }) => {
    const [bulletins, setBulletins] = useState<BulletinTopic[]>([]);
    useEffect(() => {
        console.log(`Bulletin board id: ${params.id}`);
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
