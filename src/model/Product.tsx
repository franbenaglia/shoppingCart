export class Product {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
    description: string;

    toString() : string {
       return 'id: ' + this.id + ' name: ' +  this.name + ' price: '+ this.price;
    }

}