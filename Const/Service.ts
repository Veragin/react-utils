export const TECH_TREE_NAMES = [
    'TEMPLATE_MAKER',
    'TEMPLATE_RESIZE',
    'TEMPLATE_EDIT',
    'TEMPLATE_USER',
    'TEMPLATE_DOWNLOAD',
    'TEMPLATE_APPROVE',
    'CARD_MAKER',
] as const;

export type TTechTreeName = typeof TECH_TREE_NAMES[number];
