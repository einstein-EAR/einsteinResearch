"use client";

import {
  Globe,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Tag,
  User,
} from "lucide-react";
import { FormEvent, useState, type ReactNode } from "react";
import { ApiError } from "@/src/lib/api";
import {
  useContactFormSubmission,
  type ContactFormInput,
} from "@/src/hooks/useContactFormSubmission";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  country: string;
  message: string;
};

type ContactFormErrors = Record<keyof ContactFormData, string>;

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  country: "",
  message: "",
};

const emptyErrors: ContactFormErrors = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  country: "",
  message: "",
};

const countries = [
  { name: "India", code: "IN" },
  { name: "United States", code: "US" },
  { name: "Canada", code: "CA" },
  { name: "United Kingdom", code: "UK" },
  { name: "Australia", code: "AU" },
  { name: "New Zealand", code: "NZ" },
  { name: "South Africa", code: "ZA" },
  { name: "Other", code: "OTHER" },
];

function validateForm(data: ContactFormData): ContactFormErrors {
  const nextErrors = { ...emptyErrors };

  if (!data.name.trim()) nextErrors.name = "Name is required";
  if (!data.email.trim()) {
    nextErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    nextErrors.email = "Enter a valid email address";
  }
  if (!data.phone.trim()) {
    nextErrors.phone = "Phone number is required";
  } else if (data.phone.trim().length < 7) {
    nextErrors.phone = "Phone number must be at least 7 digits";
  }
  if (!data.subject.trim()) nextErrors.subject = "Subject is required";
  if (!data.country) nextErrors.country = "Please select a country";
  if (!data.message.trim()) {
    nextErrors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    nextErrors.message = "Message must be at least 10 characters";
  }

  return nextErrors;
}

function hasErrors(errors: ContactFormErrors) {
  return Object.values(errors).some(Boolean);
}

type FieldProps = {
  id: keyof ContactFormData;
  label: string;
  icon: ReactNode;
  error?: string;
  children: ReactNode;
};

function FormField({ id, label, icon, error, children }: FieldProps) {
  return (
    <div className="relative">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="flex items-start gap-3">
        <div className="mt-3 shrink-0 text-[#036eb6]">{icon}</div>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      {error ? (
        <p className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const fieldClassName =
  "w-full border-0 border-b-2 border-slate-200 bg-transparent py-3 text-slate-800 placeholder:text-slate-400 transition-colors duration-300 focus:border-[#036eb6] focus:outline-none focus:ring-0";

export default function ContactUsForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>(emptyErrors);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { mutateAsync, isPending } = useContactFormSubmission();

  const updateField = <K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setSubmitSuccess(false);
    setSubmitError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setSubmitError("");

    try {
      const payload: ContactFormInput = { ...formData };
      await mutateAsync(payload);
      setSubmitSuccess(true);
      setFormData(initialFormData);
      setErrors(emptyErrors);
    } catch (error) {
      if (error instanceof ApiError) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="space-y-1 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-semibold text-[#092151] sm:text-2xl">
          Send us a message
        </h2>
        <p className="text-sm text-[#858c93]">
          Fill in the details below and our team will respond within 24 hours.
        </p>
      </div>

      <FormField
        id="name"
        label="Full name"
        icon={<User className="h-5 w-5" aria-hidden />}
        error={errors.name}
      >
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          className={fieldClassName}
        />
      </FormField>

      <FormField
        id="email"
        label="Email address"
        icon={<Mail className="h-5 w-5" aria-hidden />}
        error={errors.email}
      >
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={fieldClassName}
        />
      </FormField>

      <FormField
        id="phone"
        label="Phone number"
        icon={<Phone className="h-5 w-5" aria-hidden />}
        error={errors.phone}
      >
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Your phone number"
          value={formData.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className={fieldClassName}
        />
      </FormField>

      <FormField
        id="subject"
        label="Subject"
        icon={<Tag className="h-5 w-5" aria-hidden />}
        error={errors.subject}
      >
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="How can we help?"
          value={formData.subject}
          onChange={(e) => updateField("subject", e.target.value)}
          className={fieldClassName}
        />
      </FormField>

      <FormField
        id="country"
        label="Country"
        icon={<Globe className="h-5 w-5" aria-hidden />}
        error={errors.country}
      >
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={(e) => updateField("country", e.target.value)}
          className={`${fieldClassName} cursor-pointer`}
        >
          <option value="">Select your country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        id="message"
        label="Message"
        icon={<MessageSquare className="h-5 w-5" aria-hidden />}
        error={errors.message}
      >
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your manuscript, submission, or inquiry..."
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
          className={`${fieldClassName} resize-none`}
        />
      </FormField>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#024081] to-[#036eb6] py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:translate-y-0 disabled:opacity-60 disabled:hover:shadow-md"
      >
        {isPending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Sending message...
          </>
        ) : (
          "Send message"
        )}
      </button>

      {submitError ? (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
          role="alert"
        >
          {submitError}
        </div>
      ) : null}

      {submitSuccess ? (
        <div
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
          role="status"
        >
          Thank you! Your message has been received. We will get back to you soon.
        </div>
      ) : null}
    </form>
  );
}
