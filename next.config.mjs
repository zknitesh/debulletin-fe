/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/",
                destination: "/pages",
            },
            {
                source: "/bulletins",
                destination: "/pages/bulletins",
            },
            {
                source: "/bulletins/:bulletinId",
                destination: "/pages/bulletins/:bulletinId",
            },
            {
                source: "/bulletins/:bulletinId/:bulletinTopicId",
                destination: "/pages/bulletins/:bulletinId/:bulletinTopicId",
            },
            {
                source: "/register",
                destination: "/pages/register",
            },
        ];
    },
};

export default nextConfig;
