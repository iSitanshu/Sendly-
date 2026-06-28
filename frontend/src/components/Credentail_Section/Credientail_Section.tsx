import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setEmailCredentials } from "../../store/EmailSlice";

// Fix TS error: Property 'env' does not exist on type 'ImportMeta'
// Use a narrow cast to access Vite's env safely
// Cast import.meta as any so TypeScript stops complaining
const apiUrl = process.env.REACT_APP_API_URL;

const Credential_Section = () => {
  const dispatch = useDispatch();

  const [Password, setPassword] = useState("");
  const [fromName, setFromName] = useState("");
  const [message, setMessage] = useState("");

  const checkCredentials = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: fromName,
          credentail: Password,
        }),
      });

      const data = await response.json();
      dispatch(
      setEmailCredentials({
        email: fromName,
        credentail: Password
      })
    );

      if (data.status === "success") {
        setMessage("✅ Authentication Successful");
      } else {
        setMessage("❌ Authentication Failed");
      }
    } catch (error) {
      console.log(apiUrl)
      setMessage("Server Error");
    }
  };

  return (
    <Section title="Sender">
      <Field label="Enter your email">
        <input
          className="input"
          value={fromName}
          onChange={(e) => setFromName(e.target.value)}
        />
      </Field>

      <Field label="Enter your credentials">
        <input
          className="input"
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>

      <button
        onClick={checkCredentials}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Check
      </button>

      <p>{message}</p>
    </Section>
  );
};

function Section(props: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
      <h2 className="text-lg font-semibold mb-4">{props.title}</h2>
      {props.children}
    </div>
  );
}

function Field(props: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-slate-400 mb-2">
        {props.label}
      </label>
      {props.children}
    </div>
  );
}

export default Credential_Section;