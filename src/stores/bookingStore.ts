import { atom } from "nanostores";

export interface BookingFormData {
	checkIn: string;
	checkOut: string;
	adults: number;
	children: number;
	childrenAges: number[];
	breakfast: boolean;
	parking: boolean;
}

export const bookingFormState = atom<BookingFormData>({
	checkIn: "",
	checkOut: "",
	adults: 2,
	children: 0,
	childrenAges: [],
	breakfast: false,
	parking: false,
});
