import { PhotoStockProvider } from '../PhotoStockProvider';

export class PhotoStockProviderInMemory implements PhotoStockProvider {
    async getUrlPhoto(photoName: string): Promise<string | undefined> {
        return 'cachorro';
    }
}
