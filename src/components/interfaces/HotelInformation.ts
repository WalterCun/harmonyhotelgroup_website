export interface HotelInformationContact {
    name: string;
    location: {
        address: string;
        city: string;
        country?: string;
    };
    contactInfo: {
        phone: string;
        email?: string;
        website?: string;
    };
    schedule: {
        open?: string;
        close?: string;
        always_open?: boolean;
    };
}


export interface HotelsInformationContacts {
    [key: string | number]: HotelInformationContact;
}