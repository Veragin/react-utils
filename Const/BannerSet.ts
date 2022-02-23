import { TBannerExport } from './BannerExport';
import { TMotherRole } from './Mother';

export const BANNERSET_BENT_LIST = [
    { value: 'brand', title: _('Brand') },
    { value: 'sell', title: _('Sell') },
] as const;
export const BANNERSET_BENTS = BANNERSET_BENT_LIST.map((bent) => bent.value);
export type TBannerSetBent = typeof BANNERSET_BENTS[number];

export const BANNERSET_CATEGORY_LIST = [
    { value: 'cars_and_vehicles', title: _('Car and Vehicles') },
    { value: 'travel', title: _('Travel') },
    { value: 'household_and_garden', title: _('Household and Garden') },
    {
        value: 'gifts_and_special_occasions',
        title: _('Gifts and Special occasions'),
    },
    { value: 'financial_services', title: _('Financial services') },
    {
        value: 'cosmetic_products_and_services',
        title: _('Cosmetic products and Services'),
    },
    { value: 'real_estate', title: _('Real estate') },
    { value: 'business_services', title: _('Business services') },
    { value: 'clothing_and_accessories', title: _('Clothing and Accessories') },
    { value: 'products_for_children', title: _('Products for children') },
    { value: 'dating_services', title: _('Dating services') },
    { value: 'software', title: _('Software') },
    { value: 'sport_and_fitness', title: _('Sport and fitness') },
    { value: 'consumer_electronics', title: _('Consumer electronics') },
    { value: 'telecommunication', title: _('Telecommunication') },
    { value: 'tickets', title: _('Tickets') },
    { value: 'education', title: _('Education') },
    { value: 'employment', title: _('Employment') },
] as const;
export const BANNERSET_CATEGORY = BANNERSET_CATEGORY_LIST.map((category) => category.value);
export type TBannerSetCategory = typeof BANNERSET_CATEGORY[number];

export const BANNERSET_TYPE_LIST = [
    { value: 'public', title: _('Public') },
    { value: 'template', title: _('Template') },
    { value: 'private', title: _('Private') },
    { value: 'draft', title: _('Draft') },
] as const;
export const BANNERSET_TYPE = BANNERSET_TYPE_LIST.map((type) => type.value);
export type TBannerSetType = typeof BANNERSET_TYPE[number];

export const BANNERSET_STATE = [
    { value: 'before_review', title: _('Before review') },
    { value: 'in_review', title: _('Review') },
    { value: 'returned', title: _('Returned') },
] as const;
export type TBannerSetState = typeof BANNERSET_STATE[number];

export type TBannerSetExport = {
    setInfo: TBannerSetInfo;
    extents: TBannerExport[];
    mothers?: TBannerSetMotherRole[];
};

export type TBannerSetMotherRole = {
    role: TMotherRole;
    elements: number[];
};

export type TBannerSetInfo = {
    id: number;
    name: string;
    type: TBannerSetType;
    bent: TBannerSetBent;
    category: TBannerSetCategory;
    preview?: string;
    derivate?: number;
};
