type CrudAllRequest = {
  Querystring: {
    take: number;
    from?: number;
  }
}

type CrudIdRequest = {
  Params: {
    id: number;
  }
};

type PostUser = {
  Body: {
    name: string;
    email: string;
    username: string;
    password: string;
  }
}

type PutUser = {
  Body: {
    name: string;
    email: string;
    username: string;
    password: string;
  }
  Params: {
    id: number;
  }
}

type PostPayment = {
  Body: {
    user_id: number;
    card_number: string;
    card_type: string;
    expired: string;
    cvv : string;
  }
}

type PutPayment = {
  Body: {
    user_id: number;
    card_number: string;
    card_type: string;
    expired: string;
    cvv : string;
  }
  Params: {
    id: number;
  }
}


type PostTransaction = {
  Body: {
    title: string;
    amount: number;
    currency: string;
    payment_id: number;
    to_address : string;
    // status : string;
    // status_updated: Date;
  }
}

type PutTransaction = {
  Body: {
    title: string;
    amount: number;
    currency: string;
    payment_id: number;
    to_address : string;
    // status : string;
    // status_updated: Date;
  }
  Params: {
    id: number;
  }
}

