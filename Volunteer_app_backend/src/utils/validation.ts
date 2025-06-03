/**
 * Validate password strength.
 * @param password - The password to validate.
 * @throws An error if the password is weak.
 */
export const validatePasswordStrength = (password: string): void => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    if (password.length < minLength) {
      throw new Error('Password must be at least 8 characters long.');
    }
    if (!hasUpperCase) {
      throw new Error('Password must contain at least one uppercase letter.');
    }
    if (!hasLowerCase) {
      throw new Error('Password must contain at least one lowercase letter.');
    }
    if (!hasNumber) {
      throw new Error('Password must contain at least one number.');
    }
    if (!hasSpecialChar) {
      throw new Error('Password must contain at least one special character.');
    }
  };