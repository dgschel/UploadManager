export async function validateFormData(formData): Promise<void> {
  if (!formData.has("files")) {
    throw new Error(`Missing key 'files' in form data`);
  }

  const formDataValues = formData.getAll("files");

  if (formDataValues.length === 0) {
    throw new Error(`Upload at least one file`);
  }
}
