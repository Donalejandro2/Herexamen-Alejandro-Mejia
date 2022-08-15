"use strict";

export default class Event {
    constructor(value, unit, timestamp) {
        this._value = value;
        this._unit = unit;
        this._timestamp = timestamp;
    }
    get unit() {
        return this._unit
    }
    get value() {
        return this._value;
    }
    get time() {
        let time = new time(this._timestamp);
        return date.toLocaleString("nl-BE");
    }
    get date() {
        let date = new date(this._timestamp);
        return date.toLocaleDateString("nl-BE");
    }
    get htmlString() {
        let newString = `<tr><th>${this._unit}</th><th>${this._value}</th><th>${this._time}</th></tr>`
        console.log(newString);
        return newString;
    }
}