import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setAttachments } from "../../store/EmailSlice";

const apiUrl = process.env.REACT_APP_API_URL;

const Send_Mail = () => {
  const dispatch = useDispatch();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const {
    emailCredentials,
    placeholdersStore,
    recipientsList,
    emailContent,
  } = useSelector((state: any) => state.email);

  const isFormComplete =
    (emailCredentials?.email || "").trim() &&
    (emailCredentials?.credentail || "").trim() &&
    recipientsList.length > 0 &&
    (emailContent?.subject || "").trim() &&
    (emailContent?.body || "").trim();

  // ---------------- VALIDATION FUNCTION ----------------
  const validatePlaceholders = () => {
    
  // placeholders extracted from subject/body → lowercase
  const templatePlaceholders = placeholdersStore.map(
    (item: string) => item.toLowerCase().trim()
  );

  // keys from uploaded csv/excel file → lowercase
  // remove "email" because it is used separately for recipient
  const fileColumns =
    recipientsList.length > 0
      ? Object.keys(recipientsList[0])
          .map((key) => key.toLowerCase().trim())
          .filter((key) => key !== "email")   // ignore email column
      : [];

  // fields present in template but missing in file
  const missingFields = templatePlaceholders.filter(
    (field: string) => !fileColumns.includes(field)
  );

  // fields present in file but not in template
  const extraFields = fileColumns.filter(
    (field: string) => !templatePlaceholders.includes(field)
  );

  const isValid =
    missingFields.length === 0 &&
    extraFields.length === 0;

  return {
    isValid,
    missingFields,
    extraFields,
  };
};

  // ---------------- SEND FUNCTION ----------------
  const handleSend = async () => {

    if (!isFormComplete) {
      alert("Please fill all fields");
      return;
    }

    // check placeholders match
    const validation = validatePlaceholders();

    if (!validation.isValid) {

      let errorMessage = "Placeholder mismatch detected\n\n";

      if (validation.missingFields.length > 0) {
        errorMessage += `Missing in uploaded file:\n${validation.missingFields.join(
          ", "
        )}\n\n`;
      }

      if (validation.extraFields.length > 0) {
        errorMessage += `Extra columns in uploaded file:\n${validation.extraFields.join(
          ", "
        )}`;
      }

      alert(errorMessage);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append(
        "emailCredentials",
        JSON.stringify(emailCredentials)
      );

      formData.append(
        "placeholdersStore",
        JSON.stringify(placeholdersStore)
      );

      formData.append(
        "recipientsList",
        JSON.stringify(recipientsList)
      );

      formData.append(
        "emailContent",
        JSON.stringify(emailContent)
      );

      // attachments
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("attachments", file);
        });
      }

      const response = await axios.post(
        `${apiUrl}/send`,
        formData
      );

      console.log(response);

      setResults(response.data.results);

    } catch (error: any) {

      console.log(error.response?.data);
      alert("Mail sending failed");

    } finally {

      setLoading(false);
    }
  };

  // ---------------- FILE UPLOAD ----------------
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const files = Array.from(
      e.target.files || []
    );

    if (!files.length) return;

    const updatedFiles = [
      ...selectedFiles,
      ...files,
    ];

    setSelectedFiles(updatedFiles);

    dispatch(
      setAttachments(
        updatedFiles.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
        }))
      )
    );
  };

  // ---------------- REMOVE FILE ----------------
  const handleRemoveFile = (index: number) => {

    const updatedFiles = selectedFiles.filter(
      (_, i) => i !== index
    );

    setSelectedFiles(updatedFiles);

    dispatch(
      setAttachments(
        updatedFiles.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
        }))
      )
    );
  };

  return (
    <div>

      <Field label="Attachments">
        <div className="w-full">

          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="w-full text-sm text-slate-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-blue-600 file:text-white"
          />

          {selectedFiles.length > 0 && (
            <div className="mt-3 space-y-2">

              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center
                    bg-slate-800 p-2 rounded border border-slate-700"
                >
                  <div>

                    <p className="text-sm text-green-400">
                      {file.name}
                    </p>

                    <p className="text-xs text-slate-400">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>

                  </div>

                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-400 hover:text-red-500"
                  >
                    Remove
                  </button>

                </div>
              ))}

            </div>
          )}

        </div>
      </Field>

      <button
        onClick={handleSend}
        disabled={!isFormComplete || loading}
        className={`px-4 py-2 rounded text-white ${
          isFormComplete
            ? "bg-blue-500"
            : "bg-gray-500"
        }`}
      >
        {loading ? "Sending..." : "Send Mail"}
      </button>

      <div className="mt-5">

        {results.map((item, index) => (
          <div
            key={index}
            className="border p-2 mb-2 rounded"
          >
            <p>Email: {item.email}</p>

            <p>
              Status:
              {item.status === "success"
                ? " ✅ Sent"
                : " ❌ Failed"}
            </p>

            {item.error && (
              <p className="text-red-500">
                {item.error}
              </p>
            )}

          </div>
        ))}

      </div>

    </div>
  );
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full mb-4">
      <label className="block text-sm text-slate-400 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

export default Send_Mail;