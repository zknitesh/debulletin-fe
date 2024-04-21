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
                source: "/bulletins/:id",
                destination: "/pages/bulletins/:id",
            },
            {
                source: "/register",
                destination: "/pages/register",
            },
        ];
    },
};

export default nextConfig;
