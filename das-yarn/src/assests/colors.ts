export const $black = '#000000';
export const $white = '#FFFFFF';
export const $grey = '#8C8C8C';
export const $red = '#D40000';
export const $green = '#03A000';

const $severity1 = '#0BA201';
const $severity2 = '#72B601';
const $severity3 = '#CCD928';
const $severity4 = '#FBEA3A';
const $severity5 = '#FFD92D';
const $severity6 = '#FFB212';
const $severity7 = '#FA8501';
const $severity8 = '#EF6101';
const $severity9 = '#E43901';
const $severity10 = '#D50201';

export function getColor(severity: number) {
    switch (severity) {
        case 1:
            return $severity1;
        case 2:
            return $severity2;
        case 3:
            return $severity3;
        case 4:
            return $severity4;
        case 5:
            return $severity5;
        case 6:
            return $severity6;
        case 7:
            return $severity7;
        case 8:
            return $severity8;
        case 9:
            return $severity9;
        case 10:
            return $severity10;
        default:
            return $severity1;
    };
};
