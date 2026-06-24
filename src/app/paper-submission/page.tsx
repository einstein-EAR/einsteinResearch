"use client";

import PaperSubmissionForm, {
  type PaperSubmissionFormErrors,
  type PaperSubmissionFormField,
  type PaperSubmissionFormValues,
} from "@/src/components/paper-submission/paperSubmission";
import { usePaperSubmission } from "@/src/hooks/usePaperSubmission";
import { ApiError } from "@/src/lib/api";
import { FormEvent, useState } from "react";

const initialValues: PaperSubmissionFormValues = {
  authorName: "",
  paperTitle: "",
  email: "",
  country: "",
  mobile: "",
  message: "",
};

export default function PaperSubmission() {
  const [values, setValues] = useState<PaperSubmissionFormValues>(initialValues);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<PaperSubmissionFormErrors>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { mutateAsync, isPending } = usePaperSubmission();

  const handleFieldChange = (field: PaperSubmissionFormField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setSubmitSuccess(false);
    setSubmitError("");
  };

  const handleFileChange = (nextFile: File | null) => {
    setFile(nextFile);
    setErrors((prev) => ({ ...prev, file: "" }));
    setSubmitSuccess(false);
    setSubmitError("");
  };

  const validate = (): PaperSubmissionFormErrors => {
    const nextErrors: PaperSubmissionFormErrors = {};

    if (!values.authorName.trim()) nextErrors.authorName = "Author name is required";
    if (!values.paperTitle.trim()) nextErrors.paperTitle = "Title of paper is required";
    if (!values.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!values.country) nextErrors.country = "Please select a country";
    if (!values.mobile.trim()) {
      nextErrors.mobile = "Mobile number is required";
    } else if (values.mobile.trim().length < 7) {
      nextErrors.mobile = "Mobile number must be at least 7 digits";
    }
    if (!values.message.trim()) {
      nextErrors.message = "Message is required";
    }
    if (!file) nextErrors.file = "Please upload your manuscript file";

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (!file) return;

    setSubmitError("");

    try {
      await mutateAsync({
        authorName: values.authorName,
        email: values.email,
        paperTitle: values.paperTitle,
        country: values.country,
        mobile: values.mobile,
        message: values.message,
        file,
      });

      setSubmitSuccess(true);
      setValues(initialValues);
      setFile(null);
      setErrors({});
    } catch (error) {
      if (error instanceof ApiError) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-14 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#092151] sm:text-4xl">Paper Submission</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-[#858c93] sm:text-base">
          Submit your manuscript for editorial screening. Ensure your paper follows the
          IJARESM author guidelines before uploading.
        </p>
      </div>

      <PaperSubmissionForm
        values={values}
        file={file}
        errors={errors}
        isSubmitting={isPending}
        submitSuccess={submitSuccess}
        submitError={submitError}
        onFieldChange={handleFieldChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
