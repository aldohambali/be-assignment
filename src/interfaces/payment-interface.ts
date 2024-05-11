interface IPaymentBodyParam {
    user_id: number;
    card_number: string;
    card_type: string;
    expired: string;
    cvv: string;
}
interface IByIdPaymentParam {
    id: string;
}
    