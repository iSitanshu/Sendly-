import { Plus } from 'lucide-react';
import React, { useState } from 'react'

type DynField = {
  key: string;
  value: string;
};

const Key_Value = () => {
    const [fields, setFields] = useState<DynField[]>([
        { key: "", value: "" },
      ]);
  return (
    <Section title="Dynamic Fields">
          {fields.map((field, index) => (
            <div key={index} className="grid grid-cols-2 gap-3 mb-3">
              <input
                className="input"
                placeholder="Key"
                value={field.key}
                onChange={(e) =>
                  setFields((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? { ...item, key: e.target.value }
                        : item
                    )
                  )
                }
              />

              <input
                className="input"
                placeholder="Value"
                value={field.value}
                onChange={(e) =>
                  setFields((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? { ...item, value: e.target.value }
                        : item
                    )
                  )
                }
              />
            </div>
          ))}

          <button
            onClick={() =>
              setFields((prev) =>
                prev.concat([{ key: "", value: "" }])
              )
            }
            className="px-4 py-2 bg-slate-700 rounded-lg"
          >
            <Plus className="inline mr-2" />
            Add Field
          </button>
        </Section>
  )
}

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

export default Key_Value