import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setPlaceholdersStore,
  setEmailContent,
  setAttachments,
  removeAttachment,
} from "../../store/EmailSlice";

const apiUrl = process.env.REACT_APP_API_URL;

const Subject_Body = () => {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [placeholders, setPlaceholders] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleCheckContent = async () => {
    try {
      setMessage("Checking...");
      setPlaceholders([]);

      const response = await fetch(`${apiUrl}/content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, body }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      console.log(data);
      dispatch(setPlaceholdersStore(data.placeholders));

      setMessage(data.message);
      if (data.status === "success") {
        dispatch(
          setEmailContent({
            subject,
            body,
          }),
        );
        setPlaceholders(data.placeholders);
      }
    } catch (error) {
      console.error(error);
      setMessage("Error connecting to backend server.");
    }
  };

  

  return (
    // Make sure the main section container expands full width too
    <div className="w-full max-w-4xl mx-auto">
      <Section title="Message">
        <Field label="Subject">
          <input
            className="input w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Type your subject line..."
          />
        </Field>

        <Field label="Body">
          <textarea
            className="input w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 resize-none overflow-hidden min-h-[128px]"
            value={body}
            placeholder="Type your email body here..."
            onChange={(e) => {
              setBody(e.target.value);
              // --- AUTO ADJUST HEIGHT LOGIC ---
              e.target.style.height = "auto"; // Reset height first
              e.target.style.height = `${e.target.scrollHeight}px`; // Set to internal content scroll height
            }}
          />
        </Field>

        

        <button onClick={handleCheckContent}>Check</button>

        {message && <p className="mt-4 text-sm text-slate-300">{message}</p>}

        {placeholders.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-slate-400 mb-1">Detected Fields:</p>
            <div className="flex gap-2 flex-wrap">
              {placeholders.map((item, index) => (
                <span
                  key={index}
                  className="bg-slate-800 text-blue-400 px-2 py-1 text-xs rounded border border-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </Section>
    </div>
  );
};

function Section(props: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-full bg-slate-900 p-6 rounded-xl border border-slate-800">
      <h2 className="text-lg font-semibold mb-4 text-white">{props.title}</h2>
      {props.children}
    </div>
  );
}

function Field(props: { label: string; children: React.ReactNode }) {
  return (
    <div className="w-full mb-4">
      <label className="block text-sm text-slate-400 mb-2">{props.label}</label>
      {props.children}
    </div>
  );
}

export default Subject_Body;
