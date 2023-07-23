class ServiceStarter {
    toHomePage = () => window.open('https://www.sizefire.com', '_self');

    createPublicFromScratch = () => {
        window.open(`${this.baseUrl}?a=service&techTree=TEMPLATE_MAKER`);
    };

    createPublicFromPSD = () => {
        window.open(`${this.baseUrl}?a=service&techTree=TEMPLATE_RESIZE`);
    };

    editTemplate = (setId: number) => {
        window.open(`${this.baseUrl}?a=service&techTree=TEMPLATE_EDIT&setId=${setId}`);
    };

    downloadTemplate = (setId: number) => {
        window.open(`${this.baseUrl}?a=service&techTree=TEMPLATE_DOWNLOAD&setId=${setId}`);
    };

    openDownloadInfo = (setId: number) => {
        window.open(`${this.baseUrl}?a=info&info=downloadInfo&setId=${setId}`, '_self');
    };

    openDownloadError = (setId: number) => {
        window.open(`${this.baseUrl}?a=info&info=downloadError&setId=${setId}`, '_self');
    };

    openUnknownError = () => {
        window.open(`${this.baseUrl}?a=info&info=unknownError`, '_self');
    };

    private get baseUrl() {
        return 'https://sizefire.com/service';
    }
}

const serviceStarter = new ServiceStarter();
export { serviceStarter };
