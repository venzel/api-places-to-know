import { AppException } from '@shared/exceptions/AppException';
import { normalizeString } from '@shared/helpers/normalizeStringHelper';
import { StatusCode } from '@shared/helpers/StatusCode';
import axios from 'axios';
import { PhotoStockProvider } from '../PhotoStockProvider';

export class UnPlashProvider implements PhotoStockProvider {
    private async processServiceUnPlash(photoName: string): Promise<any> {
        const serviceUrl = 'https://api.unsplash.com/search/photos';

        const clientId = '5vxOyD9gIZLfWXDIg1nFq_bnnGE99yu4OsoI7HweIms';

        const stringNormalized = normalizeString(photoName);

        const url = `${serviceUrl}?client_id=${clientId}&query=${stringNormalized}`;

        try {
            const results = await axios.get(url);

            return results.data.results;
        } catch (_) {
            throw new AppException(`Error in process api unplash!`, StatusCode.BAD_REQUEST);
        }
    }

    async getUrlPhoto(photoName: string): Promise<string> {
        const dataPhotos = await this.processServiceUnPlash(photoName);

        const firstDataPhoto = dataPhotos[0];

        return firstDataPhoto ? firstDataPhoto.urls.full : undefined;
    }
}
