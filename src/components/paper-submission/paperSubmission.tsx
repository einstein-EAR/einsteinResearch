"use client";

import {
  FileUp,
  Globe,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  ScrollText,
  User,
} from "lucide-react";
import { FormEvent, type ReactNode } from "react";

export type PaperSubmissionFormValues = {
  authorName: string;
  paperTitle: string;
  email: string;
  country: string;
  mobile: string;
  message: string;
};

export type PaperSubmissionFormField = keyof PaperSubmissionFormValues;

export type PaperSubmissionFormErrors = Partial<
  Record<PaperSubmissionFormField | "file", string>
>;

type PaperSubmissionFormProps = {
  values: PaperSubmissionFormValues;
  file: File | null;
  errors?: PaperSubmissionFormErrors;
  isSubmitting?: boolean;
  submitSuccess?: boolean;
  submitError?: string;
  countries?: { name: string; code: string }[];
  onFieldChange: (field: PaperSubmissionFormField, value: string) => void;
  onFileChange: (file: File | null) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const defaultCountries = [
  { name: "India", code: "IN" },
  { name: "United States", code: "US" },
  { name: "Canada", code: "CA" },
  { name: "United Kingdom", code: "UK" },
  { name: "Australia", code: "AU" },
  { name: "New Zealand", code: "NZ" },
  { name: "South Africa", code: "ZA" },
  { name: "Other", code: "OTHER" },
];

const fieldClassName =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 transition-colors duration-300 focus:border-[#036eb6] focus:outline-none focus:ring-2 focus:ring-[#036eb6]/20";

type FieldProps = {
  id: string;
  label: string;
  icon: ReactNode;
  error?: string;
  children: ReactNode;
};

function FormField({ id, label, icon, error, children }: FieldProps) {
  return (
    <div>
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

export default function PaperSubmissionForm({
  values,
  file,
  errors = {},
  isSubmitting = false,
  submitSuccess = false,
  submitError = "",
  countries = defaultCountries,
  onFieldChange,
  onFileChange,
  onSubmit,
}: PaperSubmissionFormProps) {
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    onFileChange(selected);
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="w-full space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-semibold text-[#092151] sm:text-2xl">
          Submit your manuscript
        </h2>
        <p className="mt-1 text-sm text-[#858c93]">
          Upload your paper and author details. All fields marked below are required.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="authorName"
          label="Author name"
          icon={<User className="h-5 w-5" aria-hidden />}
          error={errors.authorName}
        >
          <input
            id="authorName"
            name="authorName"
            type="text"
            autoComplete="name"
            placeholder="Full name of corresponding author"
            value={values.authorName}
            onChange={(e) => onFieldChange("authorName", e.target.value)}
            className={fieldClassName}
          />
        </FormField>

        <FormField
          id="email"
          label="Email ID"
          icon={<Mail className="h-5 w-5" aria-hidden />}
          error={errors.email}
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="author@university.edu"
            value={values.email}
            onChange={(e) => onFieldChange("email", e.target.value)}
            className={fieldClassName}
          />
        </FormField>
      </div>

      <FormField
        id="paperTitle"
        label="Title of paper"
        icon={<ScrollText className="h-5 w-5" aria-hidden />}
        error={errors.paperTitle}
      >
        <input
          id="paperTitle"
          name="paperTitle"
          type="text"
          placeholder="Enter the full title of your manuscript"
          value={values.paperTitle}
          onChange={(e) => onFieldChange("paperTitle", e.target.value)}
          className={fieldClassName}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="country"
          label="Country"
          icon={<Globe className="h-5 w-5" aria-hidden />}
          error={errors.country}
        >
          <select
            id="country"
            name="country"
            value={values.country}
            onChange={(e) => onFieldChange("country", e.target.value)}
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
          id="mobile"
          label="Mobile"
          icon={<Phone className="h-5 w-5" aria-hidden />}
          error={errors.mobile}
        >
          <input
            id="mobile"
            name="mobile"
            type="tel"
            autoComplete="tel"
            placeholder="Your mobile number"
            value={values.mobile}
            onChange={(e) => onFieldChange("mobile", e.target.value)}
            className={fieldClassName}
          />
        </FormField>
      </div>

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
          placeholder="Cover letter, co-authors, or special instructions for the editorial desk..."
          value={values.message}
          onChange={(e) => onFieldChange("message", e.target.value)}
          className={`${fieldClassName} resize-none`}
        />
      </FormField>

      <div>
        <label
          htmlFor="manuscriptFile"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Choose file
        </label>
        <div className="flex flex-col gap-3 rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/40 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#024081] text-white">
              <FileUp className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-medium text-[#092151]">
                {file ? file.name : "Upload manuscript (PDF or DOC)"}
              </p>
              <p className="mt-0.5 text-xs text-[#858c93]">
                Max recommended size 10 MB · PDF, DOC, DOCX
              </p>
            </div>
          </div>
          <label className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-[#024081] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#036eb6]">
            Browse files
            <input
              id="manuscriptFile"
              name="manuscriptFile"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              onChange={handleFileInput}
            />
          </label>
        </div>
        {errors.file ? (
          <p className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.file}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#024081] to-[#036eb6] py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:translate-y-0 disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Submitting...
          </>
        ) : (
          "Submit paper"
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
          Your paper has been submitted successfully. Our editorial team will contact you
          shortly.
        </div>
      ) : null}
    </form>
  );
}
