import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setEmailCredentials } from "../../store/EmailSlice";

const apiUrl = process.env.REACT_APP_API_URL;

const Credential_Section = () => {
  const dispatch = useDispatch();

  const [Password, setPassword] = useState("");
  const [fromName, setFromName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);   // added

  const checkCredentials = async () => {
    setLoading(true);
    setMessage("");

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
          credentail: Password,
        })
      );

      if (data.status === "success") {
        setMessage("✅ Authentication Successful");
      } else {
        setMessage("❌ Authentication Failed");
      }
    } catch (error) {
      console.log(apiUrl);
      setMessage("Server Error");
    } finally {
      setLoading(false);   // added
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
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500"
        }`}
      >
        {loading ? "Checking..." : "Check"}
      </button>

      <p className="mt-3">{message}</p>
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