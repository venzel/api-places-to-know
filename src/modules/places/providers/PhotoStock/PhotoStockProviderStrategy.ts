import { container } from 'tsyringe';
import { UnPlashProvider } from './implements/UnPlashProvider';
import { PhotoStockProvider } from './PhotoStockProvider';

export class PhotoStockProviderStrategy {
    private strategies: any = {};

    constructor() {
        this.initStrategies();
    }

    initStrategies(): void {
        this.strategies['unplash'] = () => UnPlashProvider;
    }

    setStrategy(service: string): void {
        const existsStrategy = this.strategies.hasOwnProperty(service);

        if (!existsStrategy) {
            throw new Error('Service provider not found in strategies!');
        }

        container.registerSingleton<PhotoStockProvider>('PhotoStockProvider', this.strategies[service]());
    }
}
