const baseAddress = 'https://admin.sizefire.com/service';

class ServiceStarter {
    toHomePage = () => window.open('https://www.sizefire.com', '_self');

    createPublicFromScratch = () => {
        window.open(`${baseAddress}?a=service&techTree=TEMPLATE_MAKER`);
    };

    createPublicFromPSD = () => {
        window.open(`${baseAddress}?a=service&techTree=TEMPLATE_RESIZE`);
    };

    editTemplate = (setId: number) => {
        window.open(`${baseAddress}?a=service&techTree=TEMPLATE_EDIT&setId=${setId}`);
    };

    downloadTemplate = (setId: number) => {
        window.open(`${baseAddress}?a=service&techTree=TEMPLATE_DOWNLOAD&setId=${setId}`);
    };

    openDownloadInfo = (setId: number) => {
        window.open(`${baseAddress}?a=info&info=download&setId=${setId}`);
    };
}

const serviceStarter = new ServiceStarter();
export { serviceStarter };
