import { Link } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
} from "lucide-react";
import Credientail_Section from "../../components/Credentail_Section/CredientailSection";
import Subject_Body from "../../components/Subject_Body/SubjectBody";
import Attachments from "../../components/Attachment/Attachment";
import Send_Mail from "../../components/Send_Mail/SendMail";

function Compose() {

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-8">

      {/* Header */}
      <header className="max-w-5xl mx-auto flex justify-between items-center mb-10">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
          <Mail className="text-violet-400" />
          Sendly
        </Link>

        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold mb-6">New Campaign</h1>

        <Credientail_Section />

        <Subject_Body />
        
        <Attachments />
        
        <Send_Mail />
      </main>
    </div>
  );
}

export default Compose;




{/* <Section title="Recipients">
          <div className="flex gap-3">
            <input
              className="input flex-1"
              value={recipientInput}
              onChange={(e) => setRecipientInput(e.target.value)}
              placeholder="Enter recipient emails"
            />

            <button
              onClick={addRecipients}
              className="px-4 py-2 bg-violet-600 rounded-lg hover:bg-violet-500"
            >
              <Plus />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {recipients.map((email, index) => (
              <div
                key={index}
                className="bg-slate-800 px-3 py-1 rounded flex gap-2 items-center"
              >
                {email}
                <button
                  onClick={() =>
                    setRecipients((prev) =>
                      prev.filter((item) => item !== email)
                    )
                  }
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </Section>

        <Key_Value /> */}
{/* <Recepient /> */}