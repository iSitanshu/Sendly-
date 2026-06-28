import { Paperclip, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { setPlaceholdersStore, setRecipientsList } from "../../store/EmailSlice";

const apiUrl = process.env.REACT_APP_API_URL;

type AttachmentType = {
  name: string;
  size: number;
  rawFile: File; // Store the original File object so we can view it later
};

type BackendResult = {
  placeholders: string[];
  recipientsList: Array<Record<string, string>>;
};

const Attachment = () => {
  const dispatch = useDispatch();

  const [attachments, setAttachments] = useState<AttachmentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [parsedData, setParsedData] = useState<BackendResult | null>(null);

  const onFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileToUpload = files[0];
    
    if (!fileToUpload.name.endsWith('.csv')) {
      setErrorMsg("Please upload a valid .csv file for recipient processing.");
      return;
    }

    // Keep track of the raw file object alongside its metadata
    const newFiles = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
      rawFile: file, 
    }));
    setAttachments((prev) => prev.concat(newFiles));

    const formData = new FormData();
    formData.append("file", fileToUpload);

    try {
      setLoading(true);
      setErrorMsg("");
      setParsedData(null);

      const response = await fetch(`${apiUrl}/attach`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to process CSV file.");
      }

      if (data.success) {
        const backendData = {
          placeholders: data.placeholders,
          recipientsList: data.recipientsList,
        };

        setParsedData(backendData);

        // Store in Redux
        dispatch(setPlaceholdersStore(data.placeholders));
        dispatch(setRecipientsList(data.recipientsList));
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred while uploading the file.");
    } finally {
      setLoading(false);
    }
  };

  // 1. Function to open the file in a new browser tab
  const openFileInTab = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    window.open(fileUrl, '_blank');
    
    // Clean up memory after a short delay
    setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
  };

  return (
    <Section title="Attachmentsen">
      <label className="block cursor-pointer border border-dashed border-slate-600 rounded-lg p-6 text-center hover:bg-slate-800 transition">
        <Paperclip className="mx-auto mb-2 text-slate-400" />
        <span className="text-sm font-medium text-slate-200">Upload CSV List / Files</span>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
          accept=".csv"
        />
      </label>

      {/* Render File List with a clickable open-link wrapper */}
      <div className="mt-3 space-y-2">
        {attachments.map((file, index) => (
          <div 
            key={index} 
            className="bg-slate-800 p-2 rounded text-sm text-slate-300 flex justify-between items-center group"
          >
            <button
              onClick={() => openFileInTab(file.rawFile)}
              className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 hover:underline text-left font-medium"
              title="Click to view raw CSV content"
            >
              <span>{file.name}</span>
              <ExternalLink size={14} className="opacity-60 group-hover:opacity-100" />
            </button>
            <span className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</span>
          </div>
        ))}
      </div>

      {loading && <p className="text-sm text-blue-400 mt-2 animate-pulse">Processing data structure...</p>}
      
      {errorMsg && (
        <div className="flex items-center gap-2 text-sm text-red-400 mt-3 bg-red-950/40 p-2 rounded border border-red-900">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {parsedData && (
        <div className="mt-4 bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
            <CheckCircle2 size={16} />
            <span>Found {parsedData.recipientsList.length} recipients</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block mb-1">Detected Target Columns:</span>
            <div className="flex flex-wrap gap-1.5">
              {/* 2. Explicitly map the core target email field first */}
              <span className="bg-blue-950/50 text-blue-400 px-2 py-0.5 text-xs rounded border border-blue-900 font-semibold">
                📩 email (Core Address Key)
              </span>
              
              {/* Dynamic placeholders follow */}
              {parsedData.placeholders.map((ph, idx) => (
                <span key={idx} className="bg-slate-800 text-slate-200 px-2 py-0.5 text-xs rounded border border-slate-700">
                  {ph}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

function Section(props: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
      <h2 className="text-lg font-semibold mb-4 text-white">{props.title}</h2>
      {props.children}
    </div>
  );
}

export default Attachment;