export class RsTime {
    protected _timeMs: number;

    constructor(timeMs: number) {
        this._timeMs = timeMs;
    }

    static fromMs(timeMs: number) {
        return new RsTime(timeMs);
    }

    static fromS(timeS: number) {
        return new RsTime(timeS * 1000);
    }

    static now() {
        return new RsTime(Date.now());
    }

    get ms() {
        return this._timeMs;
    }

    get s() {
        return this._timeMs / 1000;
    }

    valueOf() {
        return this.ms;
    }

    isEqual(otherTime: RsTime) {
        return this.ms === otherTime.ms;
    }

    isBefore(otherTime: RsTime) {
        return this.ms < otherTime.ms;
    }

    isAfter(otherTime: RsTime) {
        return this.ms > otherTime.ms;
    }
}
