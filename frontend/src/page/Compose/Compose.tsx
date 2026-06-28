import { Link } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
} from "lucide-react";
import CredientailSection from "../../components/Credentail_Section/CredientailSection";
import SubjectBody from "../../components/Subject_Body/SubjectBody";
import Attachments from "../../components/Attachment/Attachment";
import SendMail from "../../components/Send_Mail/SendMail";

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

        <CredientailSection />

        <SubjectBody />
        
        <Attachments />
        
        <SendMail />
      </main>
    </div>
  );
}

export default Compose;