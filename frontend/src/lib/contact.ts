export const limits = { subject: 128, senderEmail: 255, message: 4096 };
export type ContactInput = Record<keyof typeof limits, string>;
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export function contactInput(input: Partial<ContactInput>): ContactInput {
  return {
    subject: typeof input.subject === "string" ? input.subject.trim() : "",
    senderEmail: typeof input.senderEmail === "string" ? input.senderEmail.trim() : "",
    message: typeof input.message === "string" ? input.message.trim() : "",
  };
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (!input.subject) errors.subject = "Tulis topik pesanmu.";
  else if (input.subject.length > limits.subject) errors.subject = "Topik pesan maksimal 128 karakter.";
  if (input.senderEmail.length > limits.senderEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.senderEmail)) errors.senderEmail = "Masukkan alamat email yang valid.";
  if (!input.message) errors.message = "Tulis pesan yang ingin kamu sampaikan.";
  else if (input.message.length > limits.message) errors.message = "Pesan maksimal 4.096 karakter.";
  return errors;
}
