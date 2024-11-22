export class Product {
    _id: string;
    name: string;
    price: number;
    imgUrl: string;
    description: string;
    imageDataBase64: string | Blob;

    toString(): string {
        return 'id: ' + this._id + ' name: ' + this.name + ' price: ' + this.price;
    }

}