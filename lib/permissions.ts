export type Password = 'ceremony' | 'dinner' | 'afterparty';

export const PAGES = ['ceremony', 'dinner', 'afterparty'] as const;
export type Page = typeof PAGES[number];

const ACCESS: Record<Password, Page[]> = {
  ceremony:   ['ceremony', 'dinner', 'afterparty'],
  dinner:     ['dinner', 'afterparty'],
  afterparty: ['afterparty'],
};

export const COOKIE_NAME = 'wedding_access';

export function isValidPassword(pw: string): pw is Password {
  return pw === 'ceremony' || pw === 'dinner' || pw === 'afterparty';
}

export function canAccess(password: Password | null, page: Page): boolean {
  if (!password) return false;
  return ACCESS[password].includes(page);
}

export function getAccessiblePages(password: Password | null): Page[] {
  if (!password) return [];
  return ACCESS[password];
}
