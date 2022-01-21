import { AppException } from '@shared/exceptions/AppException';
import { StatusCode } from '@shared/helpers/StatusCode';
import axios from 'axios';
import { wordReplaceAccents } from './geralHelper';

export const unplashService = async (name: string): Promise<any> => {
    const baseUrl = 'https://api.unsplash.com/search/photos';

    const clientId = '5vxOyD9gIZLfWXDIg1nFq_bnnGE99yu4OsoI7HweIms';

    const nameReplaceAccents = wordReplaceAccents(name);

    const url = `${baseUrl}?client_id=${clientId}&query=${nameReplaceAccents}`;

    try {
        const results = await axios.get(url);

        return results.data.results;
    } catch (_) {
        throw new AppException(`Error in process api unplash!`, StatusCode.BAD_REQUEST);
    }
};

export const getFirstUrlPhotoUnplash = async (name: string): Promise<string> => {
    const dataPhotos = await unplashService(name);

    const firstDataPhoto = dataPhotos[0];

    return firstDataPhoto.urls.full;
};
