import { BaseClient } from './BaseClient';

export class PayUApi {
    private client = new BaseClient();

    constructor(private payuToken: string) {}

    async createPayment(setId: number) {
        const ip = await this.getIp();
        const downloadUrl = `https://sizefire.com/service/?a=service&techTree=TEMPLATE_DOWNLOAD&setId=${setId}`;

        const token = await this.getTestingToken();

        const response = await this.client.sendPOSTJson(
            'https://secure.payu.com/api/v2_1/orders',
            {
                merchantPosId: 4287075,
                customerIp: ip,
                description: `Sizefire`,
                totalAmount: 2500,
                currencyCode: 'CZK',
                continueUrl: downloadUrl,
                products: [
                    {
                        name: `Banner set ${setId}`,
                        unitPrice: 2500,
                        quantity: 1,
                        virtual: true,
                    },
                ],
            },
            {
                Authorization: token,
            }
        );

        console.log(response);
        const res = JSON.parse(response);

        if (res.status.statusCode !== 'SUCCESS') {
            throw new Error(`Error in creating payment ${res.status.statusCode}`);
        }

        const redirectUri = res.redirectUri as string;
        const orderId = res.orderId as string;
        return { redirectUri, orderId };
    }

    private getIp = async (): Promise<string> => {
        const res = await fetch('https://api.ipify.org?format=json');
        return (await res.json()).ip;
    };

    private getTestingToken = async () => {
        return `Bearer aff45dc8-a6ee-494e-a161-95d05ce9c269`;
    };
}
