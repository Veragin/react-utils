import { TBannerSetExport, TBannerSetInfo } from '../Const/BannerSet';

import BaseApi from './BaseApi';

export class ServiceApi extends BaseApi {
    constructor() {
        super('https://resaizer.eu/editor/');
    }

    createSet = async (data: TBannerSetExport): Promise<number> => {
        const res = await this.send('POST', `v1/sets`, JSON.stringify(data));
        return JSON.parse(res);
    };

    updateSet = async (data: TBannerSetExport) => {
        const res = await this.send('PUT', `v1/sets`, JSON.stringify(data));
        return JSON.parse(res);
    };

    deleteSet = async (setId: number) => {
        const res = await this.send('DELETE', `v1/sets/${setId}`);
        return JSON.parse(res);
    };

    getSet = async (setId: number): Promise<TBannerSetExport> => {
        const res = await this.send('GET', `v1/sets/${setId}`);
        return JSON.parse(res);
    };

    updateSetInfo = async (data: TBannerSetInfo) => {
        const res = await this.send('PUT', `v1/sets/info`, JSON.stringify(data));
        return JSON.parse(res);
    };

    getSetsInfo = async (): Promise<TBannerSetInfo[]> => {
        const res = await this.send('GET', `v1/sets`);
        return JSON.parse(res);
    };

    getTemplates = async (): Promise<TBannerSetInfo[]> => {
        const res = await this.send('GET', `v1/sets/template`);
        return JSON.parse(res);
    };

    /**********************************************************************************
     ************    Images
     **********************************************************************************/

    saveImages = async (setId: number, data: TApiImageStore): Promise<TApiImageMapping> => {
        const res = await this.send('POST', `v2/image/${setId}/upload`, JSON.stringify(data));
        return JSON.parse(res).image;
    };

    saveGuestImages = async (setId: number, data: TApiImageStore): Promise<TApiImageMapping> => {
        const res = await this.send('POST', `v2/image/${setId}/guest/upload`, JSON.stringify(data));
        return JSON.parse(res).image;
    };

    getImages = async (setId: number, imgIds: number[]): Promise<TApiImage[]> => {
        const res = await this.send('POST', `v2/image/${setId}/download`, JSON.stringify(imgIds));
        return JSON.parse(res);
    };

    getTemplateImages = async (setId: number, imgIds: number[]): Promise<TApiImage[]> => {
        const res = await this.send('POST', `v2/image/${setId}/download-template`, JSON.stringify(imgIds));
        return JSON.parse(res);
    };
}

/**********************************************************************************
 ************    Images - Types
 **********************************************************************************/

export type TApiImage = {
    imgId: number;
    base64Img: string;
};

export type TApiImageStore = {
    mappingId: number;
    elementId: number[];
    img: HTMLImageElement;
}[];

export type TApiImageMapping = {
    mappingId: number;
    imgId: number;
}[];
