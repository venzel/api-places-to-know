import { container } from 'tsyringe';
import { BcryptHashProvider } from './implements/BcryptHashProvider';
import { HashProvider } from './HashProvider';

export class HashProviderStrategy {
    private strategies: any = {};

    constructor() {
        this.initStrategies();
    }

    initStrategies(): void {
        this.strategies['bcrypt'] = () => BcryptHashProvider;
    }

    setStrategy(service: string): void {
        const existsStrategy = this.strategies.hasOwnProperty(service);

        if (!existsStrategy) {
            throw new Error('Service provider not found in strategies!');
        }

        container.registerSingleton<HashProvider>('HashProvider', this.strategies[service]());
    }
}
