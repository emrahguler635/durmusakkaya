"use client";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // For static export, save to localStorage instead of API
      const messages = JSON.parse(localStorage.getItem("contact_messages") || "[]");
      messages.push({
        ...form,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("contact_messages", JSON.stringify(messages));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Mesaj gönderilemedi");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-green-50 p-8 rounded-xl text-center">
        <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Mesajınız Gönderildi!</h3>
        <p className="text-gray-600">En kısa sürede size dönüş yapacağız.</p>
        <button onClick={() => setSuccess(false)} className="mt-4 text-blue-600 hover:underline">Yeni mesaj gönder</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
      {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="Adınız Soyadınız"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="ornek@email.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Konu</label>
        <input
          type="text"
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="Mesaj konusu"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mesaj</label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
          placeholder="Mesajınız..."
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Send size={18} />
        {loading ? "Gönderiliyor..." : "Mesaj Gönder"}
      </button>
      <p className="text-xs text-gray-500 text-center">Bilgileriniz gizli tutulacaktır.</p>
    </form>
  );
}
