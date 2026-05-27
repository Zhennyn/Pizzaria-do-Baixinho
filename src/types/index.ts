export type PizzaSize = 'Broto' | 'Grande';

export type CartItem = {
  id: string;
  name: string;
  category: string;
  size?: PizzaSize;
  secondFlavor?: any;
  observation?: string;
  border?: { name: string; price: number };
  quantity: number;
  basePrice: number;
  totalPrice: number;
};

export interface Coordinates {
  latitude: number;
  longitude: number;
}
