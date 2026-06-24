"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/src/lib/api";
import { resolveCountryLabel } from "@/src/lib/constants/countries";

/** Exact request body expected by POST /contact-forms */
export type ContactFormRequestBody = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  country: string;
  message: string;
};

/** Values from the contact form (country may be a code e.g. "IN") */
export type ContactFormInput = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  country: string;
  message: string;
};

export type ContactFormResponse = {
  id?: string;
  message?: string;
  success?: boolean;
};

export function toContactFormRequestBody(
  input: ContactFormInput,
): ContactFormRequestBody {
  const country = resolveCountryLabel(input.country);

  return {
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    subject: input.subject.trim(),
    country,
    message: input.message.trim(),
  };
}

async function submitContactForm(input: ContactFormInput) {
  const body = toContactFormRequestBody(input);

  return api.post<ContactFormResponse>("/contact-forms", body);
}

export function useContactFormSubmission() {
  return useMutation({
    mutationKey: ["contact-forms", "submit"],
    mutationFn: submitContactForm,
  });
}
