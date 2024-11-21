import { ItemsProduct } from "./ItemsProduct";
import { User } from "./User";

export class Sale {
    itemProducts: ItemsProduct[];
    user: User;
    transactionId: String;
    _id: string;
}