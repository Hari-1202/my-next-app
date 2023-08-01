/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Add the file-loader for PDF files
    config.module.rules.push({
      test: /\.(pdf)$/i,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next',
          name: 'static/media/[name].[hash].[ext]', // Change the output path and filename if needed
        },
      },
    });

    return config;
  }
}

module.exports = nextConfig
