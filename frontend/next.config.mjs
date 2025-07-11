/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                // destination: 'http://127.0.0.1:5000/api/:path*', // Flask
                destination: 'http://flask:5000/api/:path*', // Flask
            }
        ];
    }
};

export default nextConfig;
