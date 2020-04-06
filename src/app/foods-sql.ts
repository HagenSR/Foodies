import { Food } from './food';

export interface FoodsSQL {

    getFood(num : number) : Food;
    
    getFood(desc: string) : Food;

}
