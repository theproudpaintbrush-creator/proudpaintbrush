"use client";

import { useState } from "react";
import { WEB3FORMS_ACCESS_KEY } from "@/lib/site";

// Low-friction lead-capture form for /contact — an alternative to the booking
// calendar for visitors who'd rather leave their details than pick a time slot.
// Submits to Web3Forms (no backend). Renders nothing until the access key is set
// in lib/site.ts so a non-functional form never ships.
export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  if (!WEB3FORMS_ACCESS_KEY) return null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New estimate request — theproudpaintbrush.com",
          from_name: "The Proud Paintbrush website",
          ...data,
        }),
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
        <p className="text-xl font-bold text-[#1a2e44] mb-2">Thanks — we got it!</p>
        <p className="text-gray-600">
          We&apos;ll reach out within one business day. Need us sooner? Call{" "}
          <a href="tel:+18326050493" className="text-[#4B83B2] font-medium hover:underline">
            (832) 605-0493
          </a>
          .
        </p>
      </div>
    );
  }

  const field = "w-full border border-gray-300 rounded-md px-4 py-3 text-[#1a2e44] focus:outline-none focus:ring-2 focus:ring-[#4B83B2] focus:border-transparent";

  return (
    <form onSubmit={onSubmit} className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-4">
      {/* honeypot — bots fill this, humans don't */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-name" className="block text-sm font-medium text-[#1a2e44] mb-1">Name</label>
          <input id="lead-name" name="name" type="text" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="lead-phone" className="block text-sm font-medium text-[#1a2e44] mb-1">Phone</label>
          <input id="lead-phone" name="phone" type="tel" required autoComplete="tel" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="lead-email" className="block text-sm font-medium text-[#1a2e44] mb-1">Email <span className="text-gray-400 font-normal">(optional)</span></label>
        <input id="lead-email" name="email" type="email" autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="lead-message" className="block text-sm font-medium text-[#1a2e44] mb-1">What can we help with?</label>
        <textarea id="lead-message" name="message" rows={4} required placeholder="e.g. Exterior repaint on a two-story home in Sugar Land" className={field} />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-[#4B83B2] hover:bg-[#1a2e44] text-white font-bold px-6 py-3 rounded-md transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request My Free Estimate"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600 text-center">
          Something went wrong. Please call{" "}
          <a href="tel:+18326050493" className="font-medium underline">(832) 605-0493</a> instead.
        </p>
      )}
    </form>
  );
}
