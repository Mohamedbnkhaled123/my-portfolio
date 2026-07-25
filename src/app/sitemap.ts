import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mohamedkhaled.dev';

  const routes = ['', '/about', '/skills', '/experience', '/projects', '/education', '/contact'];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
