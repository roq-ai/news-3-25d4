const mapping: Record<string, string> = {
  news: 'news',
  publishers: 'publisher',
  translations: 'translation',
  urls: 'url',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
