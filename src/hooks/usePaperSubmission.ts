"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/src/lib/api";
import { resolveCountryLabel } from "@/src/lib/constants/countries";

export type PaperSubmissionInput = {
  authorName: string;
  email: string;
  paperTitle: string;
  country: string;
  mobile: string;
  message: string;
  file: File;
};

export type PaperSubmissionResponse = {
  id?: string;
  message?: string;
  success?: boolean;
};

export function toPaperSubmissionFormData(input: PaperSubmissionInput): FormData {
  const formData = new FormData();

  formData.append("name", input.authorName.trim());
  formData.append("emailId", input.email.trim());
  formData.append("titleOfPaper", input.paperTitle.trim());
  formData.append("country", resolveCountryLabel(input.country));
  formData.append("mobile", input.mobile.trim());
  formData.append("message", input.message.trim());
  formData.append("paper", input.file);

  return formData;
}

async function submitPaperSubmission(input: PaperSubmissionInput) {
  const formData = toPaperSubmissionFormData(input);

  return api.post<PaperSubmissionResponse>("/paper-submissions", formData);
}

export function usePaperSubmission() {
  return useMutation({
    mutationKey: ["paper-submissions", "submit"],
    mutationFn: submitPaperSubmission,
  });
}
