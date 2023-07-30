export function validateEmail(email: string) {
  // Regular expression for checking if an email address is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

export function validatePhoneNumber(phoneNumber: string) {
  // Regular expression for checking if a phone number is valid
  const phoneRegex = /^\d{10}$/;

  return phoneRegex.test(phoneNumber);
}
