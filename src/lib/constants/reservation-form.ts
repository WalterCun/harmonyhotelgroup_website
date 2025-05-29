// Limite de generadores
const maxAdults: number = 8;
const maxChildren: number = 8;
const maxRooms: number = 8;

export type CityOption = string;
type AdultOption = string;
type ChildrenOption = string;
type RoomOption = string;

interface GroupRoomTypeOption {
    value: string;
    labelKey: string;
}

interface VehicleTypeOption {
    value: string;
    labelKey: string;
}

export const adultOptions: AdultOption[] = [...Array(maxAdults).keys()]
    .map((i: number) => String(i + 1))
    .concat("Group");
export const childrenOptions: ChildrenOption[] = Array.from({length: maxChildren}, (_, i: number) => String(i));
export const roomOptions: RoomOption[] = Array.from({length: maxRooms}, (_, i: number) => String(i + 1));
export const groupRoomTypeOptions: GroupRoomTypeOption[] = [
    {value: "shared_room", labelKey: "components.forms.reservation.placeholder.group-shared-rooms"},
    {value: "shared_beds", labelKey: "components.forms.reservation.placeholder.group-shared-beds"},
    {value: "independent_rooms", labelKey: "components.forms.reservation.placeholder.group-independent-rooms"},
];
export const vehicleTypeOptions: VehicleTypeOption[] = [
    {value: "no_vehicle", labelKey: "components.forms.reservation.placeholder.group-type-novehicle"},
    {value: "buseta", labelKey: "components.forms.reservation.placeholder.group-type-buseta"},
    {value: "furgoneta", labelKey: "components.forms.reservation.placeholder.group-type-van"},
    {value: "bus", labelKey: "components.forms.reservation.placeholder.group-type-bus"},
    {value: "flota_vehiculos", labelKey: "components.forms.reservation.placeholder.group-type-fleet"},
    {value: "cooperativa_transporte", labelKey: "components.forms.reservation.placeholder.group-type-cooperativa"},
    {value: "multiple_options", labelKey: "components.forms.reservation.placeholder.group-type-multiple-options"},
    {value: "otro", labelKey: "components.forms.reservation.placeholder.group-type-others"},
];