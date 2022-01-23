const { env } = process;

const photoStockConfig = {
    photoStock: env.PHOTO_STOCK_STRATEGY ? String(env.PHOTO_STOCK_STRATEGY) : 'default',
};

const { photoStock } = photoStockConfig;

export { photoStock };
