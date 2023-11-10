export interface PasswordOptions {
    minLength: number;
    includeUppercase?: boolean;
    includeLowercase?: boolean;
    includeNumbers?: boolean;
    includeSymbols?: boolean;
}

export class Password {
    static calculateStrength(password: string) {
        const scoreMetrics = {
            length: password.length,
            uppercaseLetters: /[A-Z]/.test(password),
            lowercaseLetters: /[a-z]/.test(password),
            numbers: /\d/.test(password),
            symbols: /[^A-Za-z0-9]/.test(password),
            middleNumbersOrSymbols: /.[^A-Za-z0-9]./.test(
                password.slice(1, -1),
            ),
            requirements:
                password.length >= 8 &&
                /[A-Z]/.test(password) &&
                /[a-z]/.test(password) &&
                /\d/.test(password) &&
                /[^A-Za-z0-9]/.test(password),
        };

        let score = 0;

        for (const metric in scoreMetrics) {
            if (scoreMetrics[metric as keyof typeof scoreMetrics]) score += 1;
        }

        if (scoreMetrics.length < 6) {
            score = Math.min(score, 1);
        } else if (scoreMetrics.length < 8) {
            score = Math.min(score, 2);
        }

        let strength: string;
        if (score < 3) {
            strength = 'Weak';
        } else if (score < 5) {
            strength = 'Medium';
        } else {
            strength = 'Strong';
        }

        return {
            score,
            strength,
            minScore: 0,
            maxScore: Object.keys(scoreMetrics).length,
        };
    }

    static generate(options: PasswordOptions) {
        const {
            minLength,
            includeUppercase = true,
            includeLowercase = true,
            includeNumbers = true,
            includeSymbols = true,
        } = options;

        const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()-=_+';

        let characters = '';

        if (includeUppercase) characters += uppercaseLetters;
        if (includeLowercase) characters += lowercaseLetters;
        if (includeNumbers) characters += numbers;
        if (includeSymbols) characters += symbols;

        let password = '';

        for (let i = 0; i < minLength; i++) {
            password += characters.charAt(
                Math.floor(Math.random() * characters.length),
            );
        }

        return password;
    }

    static validate(password: string, options: PasswordOptions) {
        const {
            minLength,
            includeUppercase,
            includeLowercase,
            includeNumbers,
            includeSymbols,
        } = options;

        // Check if the password length meets the requirement
        if (password.length < minLength) {
            return false;
        }

        // Check for uppercase letters
        if (includeUppercase && !/[A-Z]/.test(password)) {
            return false;
        }

        // Check for lowercase letters
        if (includeLowercase && !/[a-z]/.test(password)) {
            return false;
        }

        // Check for numbers
        if (includeNumbers && !/\d/.test(password)) {
            return false;
        }

        // Check for symbols
        if (
            includeSymbols &&
            !/[!@#$%^&*()_+[\]{};':"\\|,.<>?]/.test(password)
        ) {
            return false;
        }

        return true;
    }

    static async toHash(password: string): Promise<string> {
        // const salt = await bcrypt.genSalt(saltRounds);
        // const hashedPassword = await bcrypt.hash(password, salt);
        // return hashedPassword;

        const hashedPassword = CryptoJS.SHA256(password).toString();

        return hashedPassword;
    }

    static async compareWithHash(password: string, hashedPassword: string) {
        const hashedInput = CryptoJS.SHA256(password).toString();

        return hashedInput === hashedPassword;
    }
}
