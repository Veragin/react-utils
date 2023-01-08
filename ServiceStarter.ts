const baseAddress = "https://admin.sizefire.com/service";

class ServiceStarter {
    createPublicFromScratch = () => {
        window.open(`${baseAddress}?a=service&techTree=TEMPLATE_MAKER`);
    };

    createPublicFromPSD = () => {
        window.open(`${baseAddress}?a=service&techTree=TEMPLATE_RESIZE`);
    };

    editTemplate = (setId: number) => {
        window.open(`${baseAddress}?a=service&techTree=TEMPLATE_EDIT&setId=${setId}`);
    };
}

const serviceStarter = new ServiceStarter();
export { serviceStarter };
