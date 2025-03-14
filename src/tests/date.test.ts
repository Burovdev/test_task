import { timeLeftToDate } from "@/helpers/date";

describe("timeLeftToDate", () => {
    const fixedNow = new Date("2025-03-14T12:00:00Z");

    beforeEach(() => {
        jest.useFakeTimers({ now: fixedNow });
        jest.setSystemTime(fixedNow);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("returns 'Date is in the past' when the target date is in the past", () => {
        const pastTime = "2025-03-14T11:00:00Z";
        expect(timeLeftToDate(pastTime)).toBe("Date is in the past");
    });

    it("returns correct days left (plural)", () => {
        const target = "2025-03-17T12:00:00Z";
        expect(timeLeftToDate(target)).toBe("3 days left");
    });

    it("returns correct day left (singular)", () => {
        const target = "2025-03-15T12:00:00Z";
        expect(timeLeftToDate(target)).toBe("1 day left");
    });

    it("returns correct hours left (plural)", () => {
        const target = "2025-03-14T17:00:00Z";
        expect(timeLeftToDate(target)).toBe("5 hours left");
    });

    it("returns correct hour left (singular)", () => {
        const target = "2025-03-14T13:00:00Z";
        expect(timeLeftToDate(target)).toBe("1 hour left");
    });

    it("returns correct minutes left (plural)", () => {
        const target = "2025-03-14T12:45:00Z";
        expect(timeLeftToDate(target)).toBe("45 minutes left");
    });

    it("returns correct minute left (singular)", () => {
        const target = "2025-03-14T12:01:00Z";
        expect(timeLeftToDate(target)).toBe("1 minute left");
    });
});
