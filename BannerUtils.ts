import { BANNERS, BANNER_EXTENTS, TBannerMedia } from './Const/Banners';

export const getAllExtentsOfMedia = (mediaList: TBannerMedia[]) => {
    return BANNER_EXTENTS.filter((extent) => mediaList.includes(BANNERS[extent].media));
};
