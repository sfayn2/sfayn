
export type NavType = {
    id: number;
    menu: boolean;
    arrow_back: boolean;
    side_bar: boolean;
    __typename: string;
}

export type Downloadlist = {
    status: string;
    msg: [];
    errcode: string;
}

export type Query = {
   downloadlist: Downloadlist;
}


