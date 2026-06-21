export type Password = 'chinatown' | 'disco';

export const PAGES = ['weekend', 'wedding', 'afterparty', 'guestbook'] as const;
export type Page = typeof PAGES[number];

const ACCESS: Record<Password, Page[]> = {
  disco:     ['weekend', 'wedding', 'afterparty', 'guestbook'],
  chinatown: ['wedding', 'afterparty', 'guestbook'],
};

export const COOKIE_NAME = 'wedding_access';

export function isValidPassword(pw: string): pw is Password {
  return pw === 'chinatown' || pw === 'disco';
}

export function canAccess(password: Password | null, page: Page): boolean {
  if (!password) return false;
  return ACCESS[password].includes(page);
}

export function getAccessiblePages(password: Password | null): Page[] {
  if (!password) return [];
  return ACCESS[password];
}
