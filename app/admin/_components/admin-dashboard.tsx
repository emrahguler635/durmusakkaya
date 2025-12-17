"use client";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { Plus, Trash2, Edit2, LogOut, Newspaper, Mail } from "lucide-react";

interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string | null;
  slug: string;
  published: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const [news, setNews] = useState<News[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", summary: "", content: "", imageUrl: "", published: true });
  const [tab, setTab] = useState<"news" | "messages">("news");
  const [messages, setMessages] = useState<any[]>([]);

  const fetchNews = async () => {
    const res = await fetch("/api/news");
    const data = await res.json();
    setNews(data ?? []);
  };

  const fetchMessages = async () => {
    const res = await fetch("/api/contact");
    const data = await res.json();
    setMessages(data ?? []);
  };

  useEffect(() => {
    fetchNews();
    fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/news/${editingId}` : "/api/news";
    const method = editingId ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setShowForm(false);
    setEditingId(null);
    setForm({ title: "", summary: "", content: "", imageUrl: "", published: true });
    fetchNews();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bu haberi silmek istediğinizden emin misiniz?")) {
      await fetch(`/api/news/${id}`, { method: "DELETE" });
      fetchNews();
    }
  };

  const handleEdit = (item: News) => {
    setForm({ title: item.title, summary: item.summary, content: item.content, imageUrl: item.imageUrl || "", published: item.published });
    setEditingId(item.id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-2 bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
            <LogOut size={18} /> Çıkış
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <button onClick={() => setTab("news")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${tab === "news" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
            <Newspaper size={18} /> Haberler
          </button>
          <button onClick={() => setTab("messages")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${tab === "messages" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
            <Mail size={18} /> Mesajlar ({messages?.length || 0})
          </button>
        </div>

        {tab === "news" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Haberler</h2>
              <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ title: "", summary: "", content: "", imageUrl: "", published: true }); }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Plus size={18} /> Yeni Haber
              </button>
            </div>

            {showForm && (
              <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <h3 className="text-lg font-semibold mb-4">{editingId ? "Haber Düzenle" : "Yeni Haber"}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" required placeholder="Başlık" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 border rounded-lg" />
                  <input type="text" required placeholder="Özet" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} className="w-full px-4 py-3 border rounded-lg" />
                  <textarea required rows={5} placeholder="İçerik" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-4 py-3 border rounded-lg" />
                  <input type="url" placeholder="Görsel URL (opsiyonel)" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="w-full px-4 py-3 border rounded-lg" />
                  <label className="flex items-center gap-2"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Yayınla</label>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">Kaydet</button>
                    <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg">İptal</button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {(news ?? []).length === 0 ? (
                <p className="p-6 text-gray-500 text-center">Henüz haber yok</p>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr><th className="text-left p-4">Başlık</th><th className="text-left p-4">Tarih</th><th className="p-4">Durum</th><th className="p-4">İşlemler</th></tr>
                  </thead>
                  <tbody>
                    {(news ?? []).map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="p-4 font-medium">{item.title}</td>
                        <td className="p-4 text-gray-500">{new Date(item.createdAt).toLocaleDateString("tr-TR")}</td>
                        <td className="p-4 text-center"><span className={`px-2 py-1 rounded text-xs ${item.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>{item.published ? "Yayında" : "Taslak"}</span></td>
                        <td className="p-4 flex gap-2 justify-center">
                          <button onClick={() => handleEdit(item)} className="p-2 hover:bg-blue-50 rounded"><Edit2 size={16} className="text-blue-600" /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-50 rounded"><Trash2 size={16} className="text-red-600" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {tab === "messages" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {(messages ?? []).length === 0 ? (
              <p className="p-6 text-gray-500 text-center">Henüz mesaj yok</p>
            ) : (
              <div className="divide-y">
                {(messages ?? []).map((msg) => (
                  <div key={msg.id} className="p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{msg.name}</span>
                      <span className="text-sm text-gray-500">{new Date(msg.createdAt).toLocaleDateString("tr-TR")}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{msg.email}</p>
                    <p className="font-medium text-gray-700 mb-2">{msg.subject}</p>
                    <p className="text-gray-600">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
