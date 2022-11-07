import timeConvert from "./timeConvert";

test('timeConvert::second', () => {
    const date = new Date();
    date.setSeconds(date.getSeconds() - 1);
    expect(timeConvert(Date.parse(date.toUTCString()))).toBe("1 second ago.");

});

test('timeConvert::seconds', () => {
    const date = new Date();
    date.setSeconds(date.getSeconds() - 17);
    expect(timeConvert(Date.parse(date.toUTCString()))).toBe("17 seconds ago.");

});

test('timeConvert::minute', () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 1);
    expect(timeConvert(Date.parse(date.toUTCString()))).toBe("1 minute ago.");

});

test('timeConvert::minutes', () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 39);
    expect(timeConvert(Date.parse(date.toUTCString()))).toBe("39 minutes ago.");

});

test('timeConvert::hour', () => {
    const date = new Date();
    date.setHours(date.getHours() - 1);
    expect(timeConvert(Date.parse(date.toUTCString()))).toBe("1 hour ago.");

});


test('timeConvert::hours', () => {
    const date = new Date();
    date.setHours(date.getHours() - 7);
    expect(timeConvert(Date.parse(date.toUTCString()))).toBe("7 hours ago.");

});

test('timeConvert::day', () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    expect(timeConvert(Date.parse(date.toUTCString()))).toBe("1 day ago.");

});

test('timeConvert::days', () => {
    const date = new Date();
    date.setDate(date.getDate() - 18);
    expect(timeConvert(Date.parse(date.toUTCString()))).toBe("18 days ago.");

});


test('timeConvert::month', () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    expect(timeConvert(Date.parse(date.toUTCString()))).toBe("1 month ago.");

});

test('timeConvert::months', () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 11);
    expect(timeConvert(Date.parse(date.toUTCString()))).toBe("11 months ago.");

});


test('timeConvert::year', () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    expect(timeConvert(Date.parse(date.toUTCString()))).toBe("1 year ago.");

});


test('timeConvert::years', () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 30);
    expect(timeConvert(Date.parse(date.toUTCString()))).toBe("30 years ago.");

});