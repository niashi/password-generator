import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css',
})
export class GeneratorComponent {
  generatedPassword: string = '';
  passwordLength: number = 4;
  gotUppercase: boolean = true;
  gotNumbers: boolean = true;
  gotSymbols: boolean = false;
  lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
  showAlert = false;

  copyPassword(): void {
    this.showAlert = true;
    navigator.clipboard.writeText(this.generatedPassword);

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  closeAlert(): void {
    this.showAlert = false;
  }

  changePasswordLength(event: any) {
    this.passwordLength = event.target.value;
  }

  generatePassword(): string {
    this.clearPassword();
    return this.analyseConstraintsAndGenerate();
  }

  analyseConstraintsAndGenerate(): string {
    let passwordCharacters = this.lowercaseCharacters;
    let randomUppercaseChar;
    let randomNumber;
    let randomSymbol;

    if (this.gotUppercase) {
      passwordCharacters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      randomUppercaseChar = this.pickRandomElement(
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      );
      console.log('randomUppercaseChar', randomUppercaseChar);
    }
    if (this.gotNumbers) {
      passwordCharacters += '0123456789';
      randomNumber = this.pickRandomElement('0123456789');
      console.log('randomNumber:', randomNumber);
    }
    if (this.gotSymbols) {
      passwordCharacters += '!@#$%^&*()_+[]{}|;:,.<>?';
      randomSymbol = this.pickRandomElement('!@#$%^&*()_+[]{}|;:,.<>?');
      console.log('randomSymbol:', randomSymbol);
    }
    return this.randomizePassword(
      passwordCharacters,
      randomUppercaseChar,
      randomNumber,
      randomSymbol
    );
  }

  private randomizePassword(
    characters: string,
    randomUppercaseChar: string | undefined,
    randomNumber: string | undefined,
    randomSymbol: string | undefined
  ) {
    for (let i = 0; i < this.passwordLength; i++) {
      this.generatedPassword += this.pickRandomElement(characters);
    }
    let password = this.generatedPassword;

    if (randomUppercaseChar) {
      let passwordRandomElement = this.pickRandomElement(password);
      this.generatedPassword = this.generatedPassword.replace(
        passwordRandomElement,
        randomUppercaseChar
      );
      password = password.replace(passwordRandomElement, '');
    }
    if (randomNumber) {
      let passwordRandomElement = this.pickRandomElement(password);
      this.generatedPassword = this.generatedPassword.replace(
        passwordRandomElement,
        randomNumber
      );
      password = password.replace(passwordRandomElement, '');
    }
    if (randomSymbol) {
      let passwordRandomElement = this.pickRandomElement(password);
      this.generatedPassword = this.generatedPassword.replace(
        passwordRandomElement,
        randomSymbol
      );
      password = password.replace(passwordRandomElement, '');
    }
    return this.generatedPassword;
  }

  private pickRandomElement(string: string): string {
    return string.charAt(Math.floor(Math.random() * string.length));
  }

  private resetCharacters(): void {
    this.lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
  }

  private clearPassword(): void {
    this.generatedPassword = '';
  }

  private clearConstraints(): void {
    this.gotUppercase = false;
    this.gotNumbers = false;
    this.gotSymbols = false;
  }
}
