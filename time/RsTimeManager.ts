import { TLocaleData, locales } from './dateFnsLocales';
import { TNrTimeManagerConfig, TTimeRenderFormat } from '.';
import { TOpTimeUnit, TTimeDateFormat, TTimeLanguage, renderTimeFormats } from './const';

import { NrTime } from './NrTime';
import add from 'date-fns/add';
import { createLocale } from './utils';
import dateFnsFormat from 'date-fns/format';
import differenceInDays from 'date-fns/differenceInDays';
import differenceInHours from 'date-fns/differenceInHours';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInMonths from 'date-fns/differenceInMonths';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import differenceInWeeks from 'date-fns/differenceInWeeks';
import differenceInYears from 'date-fns/differenceInYears';
import endOfDay from 'date-fns/endOfDay';
import endOfHour from 'date-fns/endOfHour';
import endOfMinute from 'date-fns/endOfMinute';
import endOfMonth from 'date-fns/endOfMonth';
import endOfSecond from 'date-fns/endOfSecond';
import endOfWeek from 'date-fns/endOfWeek';
import endOfYear from 'date-fns/endOfYear';
import formatDistance from 'date-fns/formatDistance';
import getDate from 'date-fns/getDate';
import getDay from 'date-fns/getDay';
import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';
import getMonth from 'date-fns/getMonth';
import getSeconds from 'date-fns/getSeconds';
import { getUniqueId } from '../misc';
import getWeek from 'date-fns/getWeek';
import getYear from 'date-fns/getYear';
import parse from 'date-fns/parse';
import { range } from '..';
import setDate from 'date-fns/setDate';
import setDay from 'date-fns/setDay';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import setMonth from 'date-fns/setMonth';
import setSeconds from 'date-fns/setSeconds';
import setWeek from 'date-fns/setWeek';
import setYear from 'date-fns/setYear';
import startOfDay from 'date-fns/startOfDay';
import startOfHour from 'date-fns/startOfHour';
import startOfMinute from 'date-fns/startOfMinute';
import startOfMonth from 'date-fns/startOfMonth';
import startOfSecond from 'date-fns/startOfSecond';
import startOfWeek from 'date-fns/startOfWeek';
import startOfYear from 'date-fns/startOfYear';
import sub from 'date-fns/sub';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc';

export class NrTimeManager {
    readonly locale: ReturnType<typeof createLocale>;
    readonly language: TTimeLanguage;
    readonly dateFormat: TTimeDateFormat;
    readonly timezone: string;
    readonly uniqueId: number;
    protected readonly _localeData: TLocaleData;

    constructor({ language, dateFormat, timezone }: TNrTimeManagerConfig) {
        this.language = language;
        this.dateFormat = dateFormat;
        this.locale = createLocale(this.language, this.dateFormat);
        this.timezone = timezone;
        this.uniqueId = getUniqueId();
        this._localeData = locales[this.locale];
    }

    _toDate(time: NrTime) {
        return utcToZonedTime(time.ms, this.timezone);
    }

    _fromDate(zonedDate: Date) {
        return NrTime.fromMs(zonedTimeToUtc(zonedDate, this.timezone).getTime());
    }

    get localeData() {
        // This is not very type-safe because date-fns does not have strict types (almost everything is partial and/or any)

        // I will assume that these won't change
        const daysInWeek = 7;
        const monthsInYear = 12;

        return {
            daysInWeek,
            firstDayOfWeek: () => this._localeData.options?.weekStartsOn ?? 0,
            weekdays: () =>
                range(daysInWeek).map((i) => this._localeData.localize?.day(i, { width: 'wide' }) as string),
            weekdaysShort: () =>
                range(daysInWeek).map((i) => this._localeData.localize?.day(i, { width: 'short' }) as string),
            months: () =>
                range(monthsInYear).map((i) => this._localeData.localize?.month(i, { width: 'wide' }) as string),
        };
    }

    protected _withDate(dateAction: (date: Date) => Date) {
        return (time: NrTime) => {
            let date = this._toDate(time);
            date = dateAction(date);
            return this._fromDate(date);
        };
    }

    getConfig() {
        return {
            language: this.language,
            dateFormat: this.dateFormat,
            timezone: this.timezone,
        };
    }

    protected getDurationObject(value: number, unit: TOpTimeUnit) {
        const singularUnit = enforcePlural(unit);
        const duration: Partial<Record<typeof singularUnit, typeof value>> = {};
        duration[singularUnit] = value;
        return duration;
    }

    add(value: number, unit: TOpTimeUnit) {
        const duration = this.getDurationObject(value, unit);
        return this._withDate((date) => add(date, duration));
    }

    subtract(value: number, unit: TOpTimeUnit) {
        const duration = this.getDurationObject(value, unit);
        return this._withDate((date) => sub(date, duration));
    }

    get(unit: keyof typeof getFunctions) {
        return (time: NrTime) => getFunctions[unit](this._toDate(time));
    }

    /** month is counted from 0 */
    set(unit: keyof typeof setFunctions, value: number) {
        return this._withDate((date) => setFunctions[unit](date, value));
    }

    copy(units: (keyof typeof getFunctions)[], sourceTime: NrTime) {
        return this._withDate((date) => {
            const sourceDate = this._toDate(sourceTime);
            for (let unit of units) {
                date = setFunctions[unit](date, getFunctions[unit](sourceDate));
            }
            return date;
        });
    }

    startOf(unit: keyof typeof startOfFunctions) {
        return this._withDate((date) => startOfFunctions[unit](date));
    }

    endOf(unit: keyof typeof endOfFunctions) {
        return this._withDate((date) => endOfFunctions[unit](date));
    }

    render(format: TTimeRenderFormat) {
        if (format === 'countDown')
            return (time: NrTime) =>
                formatDistance(this._toDate(time), this._toDate(NrTime.now()), {
                    includeSeconds: true,
                    addSuffix: true,
                    locale: this._localeData,
                });

        return (time: NrTime) =>
            dateFnsFormat(this._toDate(time), renderTimeFormats[this.dateFormat][format], { locale: this._localeData });
    }

    renderRange(format: TTimeRenderFormat) {
        return (time1?: NrTime, time2?: NrTime) =>
            `${time1 ? this.render(format)(time1) : ''} - ${time2 ? this.render(format)(time2) : ''}`;
    }

    getDifference(time1: NrTime, unit: keyof typeof diffFunctions) {
        return (time2: NrTime) => diffFunctions[unit](this._toDate(time1), this._toDate(time2));
    }

    parse(dateString: string, format: string) {
        return this._fromDate(parse(dateString, format, new Date()));
    }

    getNrTimeFromUs(microtime: number) {
        return NrTime.fromUs(microtime);
    }
}

function enforcePlural<T extends string>(val: T): T extends `${string}s` ? T : `${T}s` {
    if (val.endsWith('s')) return val as any;
    return (val + 's') as any;
}

const startOfFunctions = {
    year: startOfYear,
    month: startOfMonth,
    week: startOfWeek,
    day: startOfDay,
    hour: startOfHour,
    minute: startOfMinute,
    second: startOfSecond,
};

const endOfFunctions = {
    year: endOfYear,
    month: endOfMonth,
    week: endOfWeek,
    day: endOfDay,
    hour: endOfHour,
    minute: endOfMinute,
    second: endOfSecond,
};

const getFunctions = {
    year: getYear,
    month: getMonth,
    week: getWeek,
    date: getDate,
    dayOfWeek: getDay,
    hour: getHours,
    minute: getMinutes,
    second: getSeconds,
};

const setFunctions = {
    year: setYear,
    month: setMonth,
    week: setWeek,
    date: setDate,
    dayOfWeek: setDay,
    hour: setHours,
    minute: setMinutes,
    second: setSeconds,
};

const diffFunctions = {
    year: differenceInYears,
    month: differenceInMonths,
    week: differenceInWeeks,
    day: differenceInDays,
    hour: differenceInHours,
    minute: differenceInMinutes,
    second: differenceInSeconds,
};
