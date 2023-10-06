import { BANNERS, BANNER_EXTENTS, TBannerMedia } from './Const/Banners';

export const getAllExtentsOfMedia = (mediaList: TBannerMedia[] | 'all') => {
    if (mediaList === 'all') return BANNER_EXTENTS;
    return BANNER_EXTENTS.filter((extent) => mediaList.includes(BANNERS[extent].media));
};
