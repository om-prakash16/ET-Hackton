"use client";

import { useState, useEffect } from "react";
import { Mail, X, CheckCircle2, XCircle, ExternalLink, ShieldCheck, Cpu } from "lucide-react";

interface SmtpConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SmtpConfigModal({ isOpen, onClose }: SmtpConfigModalProps) {
  const [smtpHost, setSmtpHost] = useState("smtp.gmail.com");
  const [smtpPort, setSmtpPort] = useState("465");
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPass, setSmtpPass] = useState("");
  const [smtpTestResult, setSmtpTestResult] = useState<{ success?: boolean; messageId?: string; previewUrl?: string; error?: string; isEthereal?: boolean } | null>(null);
  const [isTestingSmtp, setIsTestingSmtp] = useState(false);

  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      setSmtpHost(localStorage.getItem("smtp_host") || "smtp.gmail.com");
      setSmtpPort(localStorage.getItem("smtp_port") || "465");
      setSmtpUser(localStorage.getItem("smtp_user") || "");
      setSmtpPass(localStorage.getItem("smtp_pass") || "");
      setSmtpTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestAndSaveSmtp = async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("smtp_host", smtpHost);
      localStorage.setItem("smtp_port", smtpPort);
      localStorage.setItem("smtp_user", smtpUser);
      localStorage.setItem("smtp_pass", smtpPass);
    }
    setIsTestingSmtp(true);
    setSmtpTestResult(null);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: smtpUser || "andad622@gmail.com",
          subject: "🎉 IndusBrain AI - Live SMTP Connection Verified!",
          text: "Congratulations! Your SMTP server connection is working perfectly on port " + smtpPort + ".",
          html: `<div style="font-family: Arial, sans-serif; padding: 25px; background: #0B1121; color: #ffffff; border-radius: 12px; border: 1px solid #10B981;">
            <h2 style="color: #10B981;">✅ Live SMTP Connection Verified!</h2>
            <p>Your SMTP credentials for <strong>${smtpUser || "test@indusbrain.ai"}</strong> have been successfully verified.</p>
            <p style="color: #A1A1AA;">All organization notices, approval emails, and employee invitations will now arrive directly in your live inbox!</p>
          </div>`,
          smtpHost: smtpHost || null,
          smtpPort: smtpPort || null,
          smtpUser: smtpUser || null,
          smtpPass: smtpPass || null
        })
      });
      const data = await res.json();
      setSmtpTestResult(data);
    } catch (err: any) {
      setSmtpTestResult({ error: err.message });
    } finally {
      setIsTestingSmtp(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden p-6 space-y-5 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-3 text-emerald-400 font-bold text-lg">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Mail className="w-6 h-6" />
            </div>
            <span>Verify & Configure Live SMTP Engine</span>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed">
          Configure your Gmail, Outlook, or corporate SMTP server credentials to enable real-time delivery of organization onboarding invitations, status notices, and administrative alerts directly to recipients' inboxes.
        </p>

        <div className="space-y-3 pt-1">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">SMTP Host</label>
              <input 
                type="text" 
                value={smtpHost} 
                onChange={(e) => setSmtpHost(e.target.value)}
                placeholder="smtp.gmail.com"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Port</label>
              <input 
                type="text" 
                value={smtpPort} 
                onChange={(e) => setSmtpPort(e.target.value)}
                placeholder="465"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Sender Email Address / Username</label>
            <input 
              type="email" 
              value={smtpUser} 
              onChange={(e) => setSmtpUser(e.target.value)}
              placeholder="e.g. andad622@gmail.com"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">SMTP Password / App Password</label>
            <input 
              type="password" 
              value={smtpPass} 
              onChange={(e) => setSmtpPass(e.target.value)}
              placeholder="16-character App Password (for Gmail)"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <p className="text-[10px] text-zinc-500 mt-1">
              💡 For Gmail: Enable 2-Step Verification & generate a 16-character App Password in Google Account Security.
            </p>
          </div>
        </div>

        {/* Verification Result Display */}
        {smtpTestResult && (
          <div className={`p-4 rounded-xl border text-xs space-y-2 animate-in fade-in duration-150 ${
            smtpTestResult.success ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' : 'bg-red-500/10 border-red-500/30 text-red-200'
          }`}>
            {smtpTestResult.success ? (
              <>
                <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Verification Successful!
                </div>
                {smtpTestResult.isEthereal && smtpTestResult.previewUrl ? (
                  <div className="space-y-2 pt-1">
                    <p className="text-zinc-300">No live custom SMTP password provided — test email dispatched via Ethereal ESMTP Sandbox.</p>
                    <a 
                      href={smtpTestResult.previewUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-md"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Open Formatted HTML Email Preview
                    </a>
                  </div>
                ) : (
                  <p className="text-zinc-300">
                    ✅ Live email delivered directly to <strong>{smtpUser || "recipient"}</strong>! Message ID: <code className="text-[10px] bg-black/40 px-1 py-0.5 rounded">{smtpTestResult.messageId}</code>
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="font-bold text-red-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> SMTP Verification Error
                </div>
                <p className="font-mono text-[11px] text-red-300">{smtpTestResult.error}</p>
              </>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
          <button 
            onClick={onClose} 
            className="px-4 py-2.5 text-xs text-zinc-400 hover:text-white font-medium transition-colors"
          >
            Close Window
          </button>
          <button 
            onClick={handleTestAndSaveSmtp}
            disabled={isTestingSmtp}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2 disabled:opacity-50"
          >
            {isTestingSmtp ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Verifying Connection...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" /> Verify & Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
