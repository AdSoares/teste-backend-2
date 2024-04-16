export class CNPJService {
    public static clear(cnpj: string): string {
      if (!cnpj || !cnpj.trim()) {
        return cnpj;
      }

      return cnpj.replace(/\D/g, '');
    }
    public static validate(cnpj: string): boolean {
      // Remove all non-digit characters
      const cnpjClean = CNPJService.clear(cnpj);
  
      // Check if the CNPJ has 14 digits after cleaning
      if (cnpjClean.length !== 14) {
        return false;
      }
  
      // Check if all digits are the same, which makes the CNPJ invalid
      if (/^(\d)\1+$/.test(cnpjClean)) {
        return false;
      }
  
      // Calculate the first verification digit
      let sum = 0;
      let weight = 5;
      for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpjClean[i]) * weight;
        weight--;
        if (weight === 1) {
          weight = 9;
        }
      }
      let firstDigit = 11 - (sum % 11);
      if (firstDigit >= 10) {
        firstDigit = 0;
      }
  
      // Check if the first verification digit is correct
      if (parseInt(cnpjClean[12]) !== firstDigit) {
        return false;
      }
  
      // Calculate the second verification digit
      sum = 0;
      weight = 6;
      for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpjClean[i]) * weight;
        weight--;
        if (weight === 1) {
          weight = 9;
        }
      }
      let secondDigit = 11 - (sum % 11);
      if (secondDigit >= 10) {
        secondDigit = 0;
      }
  
      // Check if the second verification digit is correct
      if (parseInt(cnpjClean[13]) !== secondDigit) {
        return false;
      }
  
      // If passed all validations, the CNPJ is valid
      return true;
    }
  }
  