import { cn } from "@/helpers/cn";

describe("cn utility", () => {
    it("should join simple strings", () => {
        expect(cn("foo", "bar")).toBe("foo bar");
    });

    it("should ignore falsy values", () => {
        expect(cn("foo", false, null, undefined, "bar")).toBe("foo bar");
    });

    it("should merge conflicting Tailwind classes (later wins)", () => {
        expect(cn("p-4", "p-2")).toBe("p-2");
    });

    it("should handle object syntax", () => {
        expect(cn("foo", { bar: true, baz: false })).toBe("foo bar");
    });

    it("should handle nested arrays", () => {
        expect(cn(["foo", ["bar", { baz: true }]])).toBe("foo bar baz");
    });
});
