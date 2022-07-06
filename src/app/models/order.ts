export interface Order {
    orderId: number;
    totalPrice:number;
    date:Date;
    userId:number;
    resolved:boolean;
}