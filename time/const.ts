import enEuLocale from 'date-fns/locale/en-GB';

const DAY_OF_MONTH = 'dd';
const MONTH_SHORT = 'MMM';
const MONTH_NUMBER = 'MM';
const YEAR_FULL = 'yyyy';

const TIME_US = 'h:mm aa';
const TIME_EU = 'H:mm';
const TIME_SECONDS_US = 'K:mm:ss aa';
const TIME_SECONDS_EU = 'H:mm:ss';

const common = {
    countDown: '***',

    monthYearShort: 'MMM yy',
    monthYear: 'MMMM yyyy',
    quarterYear: 'qo yy',

    dayShort: 'EEEEEE',
    day: 'EEEE',
    monthShort: 'LLL',
    month: 'LLLL',
    year: 'yyyy',
} as const;

export const renderTimeFormats = {
    us: {
        numericDate: `${MONTH_NUMBER}/${DAY_OF_MONTH}/${YEAR_FULL}`,
        numericDateTime: `${MONTH_NUMBER}/${DAY_OF_MONTH}/${YEAR_FULL} ${TIME_US}`,
        numericDateTimeSeconds: `${MONTH_NUMBER}/${DAY_OF_MONTH}/${YEAR_FULL} ${TIME_SECONDS_US}`,

        date: `${MONTH_SHORT} ${DAY_OF_MONTH} ${YEAR_FULL}`,
        dateTime: `${MONTH_SHORT} ${DAY_OF_MONTH} ${YEAR_FULL} ${TIME_US}`,

        time: TIME_US,
        timeSeconds: TIME_SECONDS_US,

        download: `${MONTH_NUMBER}/${DAY_OF_MONTH}/${YEAR_FULL}_h:mm_aa`,
        ...common,
    },
    eu: {
        numericDate: `${DAY_OF_MONTH}.${MONTH_NUMBER}.${YEAR_FULL}`,
        numericDateTime: `${DAY_OF_MONTH}.${MONTH_NUMBER}.${YEAR_FULL} ${TIME_EU}`,
        numericDateTimeSeconds: `${DAY_OF_MONTH}.${MONTH_NUMBER}.${YEAR_FULL} ${TIME_SECONDS_EU}`,

        date: `${DAY_OF_MONTH} ${MONTH_SHORT} ${YEAR_FULL}`,
        dateTime: `${DAY_OF_MONTH} ${MONTH_SHORT} ${YEAR_FULL} ${TIME_EU}`,

        time: TIME_EU,
        timeSeconds: TIME_SECONDS_EU,

        download: `${DAY_OF_MONTH}.${MONTH_NUMBER}.${YEAR_FULL}_${TIME_EU}`,
        ...common,
    },
} as const;

export const LANGUAGES = ['cs', 'en'] as const;
export const DATE_FORMATS = ['eu', 'us'] as const;
export const RENDER_TIME_FORMATS = Object.keys(renderTimeFormats.eu) as Array<keyof typeof renderTimeFormats.eu>;

type TTimeUnitSingular = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';
type SingularOrPlural<T extends string> = T | `${T}s`;
export type TTimeUnit = SingularOrPlural<TTimeUnitSingular>;
export type TOpTimeUnit = SingularOrPlural<TTimeUnitSingular | 'week'>;

type TRenderTimeFormats = typeof renderTimeFormats;
export type TTimeRenderFormat = keyof TRenderTimeFormats[keyof TRenderTimeFormats];
export type TTimeLanguage = typeof LANGUAGES[number];
export type TTimeDateFormat = typeof DATE_FORMATS[number];

export type TNrTimeManagerConfig = {
    language: TTimeLanguage;
    dateFormat: TTimeDateFormat;
    timezone: string;
};
