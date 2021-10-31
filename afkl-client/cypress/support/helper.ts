export const e2e = (el: string, child = '') => `[data-e2e="${el}"]${(child ? ' ' + child : '')}`;
