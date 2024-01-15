class ServiceStarter {
    toHomePage = () => window.open('https://www.sizefire.com', '_self');

    createPublicFromScratch = () => {
        window.open(`${this.baseServiceUrl}?a=service&techTree=TEMPLATE_MAKER`);
    };

    createPublicFromPSD = () => {
        window.open(`${this.baseServiceUrl}?a=service&techTree=TEMPLATE_RESIZE`);
    };

    editTemplate = (setId: number) => {
        window.open(`${this.baseServiceUrl}?a=service&techTree=TEMPLATE_EDIT&setId=${setId}`);
    };

    downloadTemplate = (setId: number) => {
        window.open(`${this.baseServiceUrl}?a=service&techTree=TEMPLATE_DOWNLOAD&setId=${setId}`);
    };

    openDownloadInfo = (setId: number) => {
        window.open(`${this.baseServiceUrl}?a=info&info=downloadInfo&setId=${setId}`, '_self');
    };

    openDownloadError = (setId: number) => {
        window.open(`${this.baseServiceUrl}?a=info&info=downloadError&setId=${setId}`, '_self');
    };

    openThankYouDownload = () => {
        window.open(`https://sizefire.com/thankyou/downloaded/`, '_self');
    };

    openUnknownError = () => {
        window.open(`${this.baseServiceUrl}?a=info&info=unknownError`, '_self');
    };

    private get baseServiceUrl() {
        return 'https://sizefire.com/service';
    }
}

const serviceStarter = new ServiceStarter();
export { serviceStarter };
