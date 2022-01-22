import { photoStock } from '@configs/providersConfig';

import { PhotoStockProviderStrategy } from './PhotoStock/PhotoStockProviderStrategy';

new PhotoStockProviderStrategy().setStrategy(photoStock);
