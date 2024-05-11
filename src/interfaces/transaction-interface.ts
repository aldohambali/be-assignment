interface ITransactionBodyParam {
    title: string;
    amount: number;
    currency: string;
    payment_id:number;
    to_address: string;
    status:string;
    status_updated: Date;
}

interface IByIdTransactionParam {
    id: string;
}
    