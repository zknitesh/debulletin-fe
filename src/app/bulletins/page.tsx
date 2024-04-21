import Link from "next/link";

export default function Bulletin() {
    const bulletins = [
        {
            id: "b1",
            text: "Zkip Labs Board",
        },
        {
            id: "b2",
            text: "Write Anything Board",
        },
        {
            id: "b3",
            text: "Fancy Protest Board",
        },
    ];

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full lg:flex lg:justify-between font-mono text-sm">
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    Bulletin Board
                </div>
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <Link href="/">
                        <a className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500">
                            HOME
                        </a>
                    </Link>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 flex h-48 w-full flex-col items-start justify-center p-4 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                {bulletins.map((bulletin, index) => (
                    <Link key={bulletin.id} href={`/bulletins/${bulletin.id}`}>
                        <a className="mb-4 w-full text-left block p-2 bg-white rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-700">
                            <p className="font-medium">
                                <span className="mr-2">{index + 1}.</span>
                                {bulletin.text}
                            </p>
                        </a>
                    </Link>
                ))}
            </div>
            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial from-blue-200 to-transparent blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic from-sky-200 to-blue-500 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br from-transparent to-blue-700 opacity-10 after:dark:from-sky-900 via-[#0141ff] opacity-40 before:lg:h-[360px] z-[-1]"></div>
            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
        </main>
    );
}
