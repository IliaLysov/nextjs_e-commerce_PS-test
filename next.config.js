/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
    
        return config;
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/a/**',
            },
            {
                protocol: 'https',
                hostname: 'gardener-plants.storage.yandexcloud.net',
                port: '',
                pathname: '/avatars/**',
            },
            {
                protocol: 'https',
                hostname: 'avatars.yandex.net',
                port: '',
                pathname: '/get-yapic/**',
            }
        ],
    },
}

module.exports = nextConfig
