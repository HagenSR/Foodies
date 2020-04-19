import {Food} from './app/food';

declare module "*.json" {
    const value: Food[];
    export default value;
  }