// import { Check, Copy, Send } from 'lucide-react';
// import React, { useMemo, useState } from 'react'

// const Review = () => {
//     const [copied, setCopied] = useState(false);

//       const payload = useMemo(() => {
//         const variables: Record<string, string> = {};
    
//         fields.forEach((f) => {
//           if (f.key.trim() !== "") variables[f.key] = f.value;
//         });
    
//         return {
//           from: { name: fromName, email: from },
//           replyTo,
//           recipients,
//           subject,
//           body,
//           variables,
//           attachments: attachments.map((a) => a.name),
//         };
//       }, [fromName, from, replyTo, recipients, subject, body, fields, attachments]);
    

//     async function copyJson() {
//     await navigator.clipboard.writeText(
//       JSON.stringify(payload, null, 2)
//     );
//     setCopied(true);
//     setTimeout(() => setCopied(false), 1500);
//   }

//   return (
//     <Section title="Review">
//               <button
//                 onClick={copyJson}
//                 className="px-4 py-2 bg-slate-700 rounded-lg mb-4"
//               >
//                 {copied ? <Check className="inline" /> : <Copy className="inline" />}
//                 <span className="ml-2">Copy JSON</span>
//               </button>
    
//               <pre className="bg-black p-4 rounded-lg text-sm overflow-auto">
//                 {JSON.stringify(payload, null, 2)}
//               </pre>
    
//               <button className="mt-4 w-full bg-violet-600 hover:bg-violet-500 py-3 rounded-lg flex justify-center gap-2">
//                 <Send />
//                 Send Campaign
//               </button>
//             </Section>
//   )
// }

// function Section(props: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
//       <h2 className="text-lg font-semibold mb-4">{props.title}</h2>
//       {props.children}
//     </div>
//   );
// }

// function Field(props: {
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="mb-4">
//       <label className="block text-sm text-slate-400 mb-2">
//         {props.label}
//       </label>
//       {props.children}
//     </div>
//   );
// }

// export default Review

import React from 'react'

const Review = () => {
  return (
    <div>
        Review
    </div>
  )
}

export default Review