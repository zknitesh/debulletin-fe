"use client";
import { useEffect, useState, useRef } from "react";
import {
    BulletinTopic,
    Priority,
} from "../../../../model/bulletin.details.model";
import { useRouter } from "next/navigation";

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

interface Position {
    top: number;
    left: number;
    rotate: number;
}

interface Dimension {
    width: number;
    height: number;
}

interface BulletinPosition extends Position, Dimension {
    id: string; // Include the ID in the position definition
}

interface ContainerDimensions extends Dimension {}

const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const getPriorityZIndex = (priority: Priority) => {
    switch (priority) {
        case Priority.High:
            return 300;
        case Priority.Medium:
            return 200;
        case Priority.Low:
            return 100;
        default:
            return 100;
    }
};

const getRandomNonOverlappingPosition = (
    bulletin: BulletinTopic,
    positions: BulletinPosition[],
    containerDimensions: Dimension
): BulletinPosition => {
    let maxAttempts = 50;
    let position: BulletinPosition;
    do {
        position = {
            id: bulletin.id,
            top: Math.random() * (containerDimensions.height - 100),
            left: Math.random() * (containerDimensions.width - 180),
            rotate: Math.random() * 20 - 10,
            width: 180,
            height: 100,
        };

        let overlap = positions.some((pos) => {
            return !(
                position.left + position.width < pos.left ||
                position.left > pos.left + pos.width ||
                position.top + position.height < pos.top ||
                position.top > pos.top + pos.height
            );
        });

        if (!overlap) {
            positions.push(position);
            break;
        }
    } while (--maxAttempts);

    return position;
};

const BulletinBoardPage = ({
    params,
}: {
    params: { bulletinId: string; bulletinTopicId: string };
}) => {
    const [bulletins, setBulletins] = useState<BulletinTopic[]>([]);
    const [containerDimensions, setContainerDimensions] = useState<Dimension>({
        width: 1200,
        height: 800,
    });
    const positions = useRef<BulletinPosition[]>([]);
    const router = useRouter();
    const selectedId = params.bulletinTopicId as string | undefined;
    console.log(
        `Bulletin board id ${params.bulletinId}, topic id ${params.bulletinTopicId}`
    );
    useEffect(() => {
        function updateDimensions() {
            setContainerDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", updateDimensions);
        updateDimensions();

        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);

    useEffect(() => {
        positions.current = []; // Clear previous positions
        const sortedBulletins = sampleBulletins.sort((a, b) =>
            a.priority.localeCompare(b.priority)
        );
        shuffleArray(sortedBulletins);
        setBulletins(sortedBulletins);

        sortedBulletins.forEach((bulletin) => {
            if (!positions.current.some((p) => p.id === bulletin.id)) {
                getRandomNonOverlappingPosition(
                    bulletin,
                    positions.current,
                    containerDimensions
                );
            }
        });
    }, [containerDimensions]);

    const handleBulletinSelect = (bulletinTopicId: string) => {
        router.push(
            `/bulletins/${params.bulletinId}/bulletinTopicId=${bulletinTopicId}`,
            {
                scroll: true,
            }
        );
    };

    return (
        <div
            className="relative"
            style={{ width: "100vw", height: "100vh", background: "burlywood" }}
        >
            <div
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 p-3 bg-white text-black text-sm rounded shadow-md transition-opacity duration-300 ease-linear ${
                    selectedId ? "opacity-100" : "opacity-0"
                }`}
            >
                {selectedId
                    ? `Created by: ${
                          bulletins.find((b) => b.id === selectedId)?.createdBy
                      }, Date: ${
                          bulletins.find((b) => b.id === selectedId)?.createdAt
                      }`
                    : ""}
            </div>
            {bulletins.map((topic) => {
                const pos = positions.current.find(
                    (p) => p.id === topic.id
                ) || {
                    top: 0,
                    left: 0,
                    rotate: 0,
                    width: 180,
                    height: 100,
                    id: topic.id,
                };
                const baseZIndex = getPriorityZIndex(topic.priority);
                const zIndex = selectedId === topic.id ? 1000 : baseZIndex;
                return (
                    <div
                        key={topic.id}
                        onClick={() => handleBulletinSelect(topic.id)}
                        className={`absolute p-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out 
                        ${
                            topic.priority === Priority.High
                                ? "text-2xl font-bold bg-red-500 hover:bg-red-600 text-white"
                                : topic.priority === Priority.Medium
                                ? "text-lg bg-yellow-300 hover:bg-yellow-400"
                                : "text-base bg-green-200 hover:bg-green-300"
                        }`}
                        style={{
                            top: `${pos.top}px`,
                            left: `${pos.left}px`,
                            transform: `rotate(${pos.rotate}deg)`,
                            zIndex: zIndex,
                        }}
                    >
                        {topic.title}
                    </div>
                );
            })}
        </div>
    );
};

export default BulletinBoardPage;
