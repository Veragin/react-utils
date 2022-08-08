import { TBannerSetExport, TBannerSetInfo } from "../Const/BannerSet";

import BaseApi from "./BaseApi";

export class ServiceApi extends BaseApi {
    constructor() {
        super("https://sizefire.eu/editor/v1/");
    }

    getSetsOverview = async (): Promise<TBannerSetInfo[]> => {
        const res = await this.send("GET", `sets`);
        return JSON.parse(res);
    };

    getSet = async (setId: number): Promise<TBannerSetExport> => {
        const res = await this.send("GET", `sets/${setId}`);
        return JSON.parse(res);
    };

    createSet = async (data: TBannerSetExport): Promise<number> => {
        const res = await this.send("POST", `sets`, JSON.stringify(data));
        return JSON.parse(res);
    };

    updateSet = async (data: TBannerSetExport) => {
        const res = await this.send("PUT", `sets`, JSON.stringify(data));
        return JSON.parse(res);
    };

    updateSetInfo = async (data: TBannerSetInfo) => {
        const res = await this.send("PUT", `sets/info`, JSON.stringify(data));
        return JSON.parse(res);
    };

    deleteSet = async (setId: number) => {
        const res = await this.send("DELETE", `sets/${setId}/`);
        return JSON.parse(res);
    };

    /**********************************************************************************
     ************    Public
     **********************************************************************************/

    getPublicOverview = async (): Promise<TBannerSetInfo[]> => {
        const res = await this.send("GET", `sets/public`);
        return JSON.parse(res);
    };

    /**********************************************************************************
     ************    Images
     **********************************************************************************/

    saveImages = async (
        setId: number,
        data: TApiImageStore
    ): Promise<TApiImageMapping> => {
        const res = await this.send(
            "POST",
            `images/${setId}/upload`,
            JSON.stringify(data)
        );
        return JSON.parse(res).image;
    };

    getImages = async (
        setId: number,
        imgIds: number[]
    ): Promise<TApiImage[]> => {
        const res = await this.send(
            "POST",
            `images/${setId}/download`,
            JSON.stringify(imgIds),
            "application/json"
        );
        return JSON.parse(res).img;
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
    img: string;
}[];

export type TApiImageMapping = {
    mappingId: number;
    imgId: number;
}[];
