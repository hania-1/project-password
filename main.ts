#!  /usr/bin/env node


import inquirer from "inquirer";

// Define an interface for the answers object
interface Answers {
    account: string;
    generatePassword: boolean;
    passwordLength?: number; // The passwordLength property is optional
}

function generateRandomPassword(length: number): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_+-=;:,.<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

inquirer.prompt<Answers>([
    {
        name: "account",
        message: "Name your account:",
        type: "input"
    },
    {
        name: "generatePassword",
        message: "Do you want to generate a random password?",
        type: "confirm",
        default: true
    },
    {
        name: "passwordLength",
        message: "Enter the length of the password:",
        type: "number",
        when: (answers: Answers) => answers.generatePassword
    }
]).then((answers: Answers) => {
    console.log("Your account name is:", answers.account);
    if (answers.generatePassword) {
        const passwordLength = answers.passwordLength || 12; // Default password length is 12
        const randomPassword = generateRandomPassword(passwordLength);
        console.log("Generated Password:", randomPassword);
    }
}).catch((error) => {
    console.error("Failed to prompt:", error);
});
