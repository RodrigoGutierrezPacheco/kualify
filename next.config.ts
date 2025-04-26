/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'tu-dominio-de-imagenes.com',  // Reemplaza con el dominio real de tus imágenes
      'localhost',                   // Para desarrollo local
      'res.cloudinary.com',          // Si usas Cloudinary
      'storage.googleapis.com',      // Si usas Google Cloud Storage
      's3.amazonaws.com',            // Si usas AWS S3
      'ejemplo.com'                  // Agrega cualquier otro dominio que uses
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // Permite cualquier hostname con HTTPS
      },
    ],
  },
}

module.exports = nextConfig