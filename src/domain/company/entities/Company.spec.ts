import Company from "./Company";

const CNPJ_VALID = "99.053.807/0001-50";
const CNPJ_INVALID = "11.000.222/0009-99";

describe('Company unit tests', () => {
    it("should throw error when ID is empty", () => {
        expect(() => {
            let company = new Company("", "name", "cnpj", true);
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let company = new Company("1", "", "cnpj", true);
        }).toThrowError("Name is required");
    });

    it("should throw error when cnpj is empty", () => {
        expect(() => {
            let company = new Company("1", "name", "", true);
        }).toThrowError("Cnpj is required");
    });

    it("should throw error when cnpj is invalid", () => {
        expect(() => {
            let company = new Company("1", "name", CNPJ_INVALID, true);
        }).toThrowError("Cnpj is invalid");
    });

    it("should allow valid cnpj", () => {
        
        const company = new Company("1", "name", CNPJ_VALID, true);

        company.activate();

        expect(company.cnpj == CNPJ_VALID);
    });

    it("should activate company", () => {
        const company = new Company("1", "name", CNPJ_VALID, false);

        company.activate();

        expect(company.isActive()).toBe(true);
    });
})