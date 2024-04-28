export interface Order {
    id:number;
    date:Date;
    status:string;
    deliveryStatus:string;
    orderTotals:number;
    userFullName:string;
    deliveryFullName:string;
    address:string;
}
