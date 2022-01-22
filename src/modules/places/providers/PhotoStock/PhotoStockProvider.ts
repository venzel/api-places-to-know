export interface PhotoStockProvider {
    getUrlPhoto(photoName: string): Promise<string>;
}
