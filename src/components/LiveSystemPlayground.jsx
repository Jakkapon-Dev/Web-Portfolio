import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { portfolioData } from "../data/portfolioData";
import {
  Play,
  CheckCircle2,
  Zap,
  Activity,
  Server,
  Database,
  Smartphone,
  RefreshCw,
  Sparkles,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveSystemPlayground({ initialProjectId = "omnipos", isOpen, onClose }) {
  const { t } = useLanguage();
  const [activeProject, setActiveProject] = useState(initialProjectId);
  const [simState, setSimState] = useState({
    status: "idle", // "idle" | "running" | "success"
    logs: [],
    metrics: null,
  });

  const projectConfig = portfolioData.featuredProjects.find((p) => p.id === activeProject) || portfolioData.featuredProjects[0];
  const theme = projectConfig?.theme || { accent: "#E8611C" };

  const runSimulation = () => {
    setSimState({ status: "running", logs: ["🚀 [Event Triggered] Ingesting client request payload..."], metrics: null });

    if (activeProject === "omnipos") {
      setTimeout(() => {
        setSimState((prev) => ({
          ...prev,
          logs: [
            ...prev.logs,
            "⚡ [Socket.io Gateway] Handshake verified via JWT middleware in 4.2ms",
            "📦 [Room Dispatch] Scoped to tenant: 'bkk-branch-01'",
            "💾 [Prisma Transaction] Order record created & recipe inventory depleted (ACID committed)",
            "🖥️ [Kitchen Display (KDS)] Ticket #204 rendered on kitchen screen!",
          ],
        }));
      }, 350);

      setTimeout(() => {
        setSimState((prev) => ({
          ...prev,
          status: "success",
          metrics: { latency: "24.8ms", status: "ACKNOWLEDGED", event: "kds:ticket:new" },
        }));
      }, 700);
    } else if (activeProject === "mystudentroom") {
      setTimeout(() => {
        setSimState((prev) => ({
          ...prev,
          logs: [
            ...prev.logs,
            "🛡️ [Next.js Server Action] Validating payload against strict Zod Schema",
            "✅ [Zod Validation] Schema match (classroomId, studentId, timestamp)",
            "🗄️ [PostgreSQL DB] Upserted attendance log with homeroom teacher authorization",
            "📲 [LINE Messaging Webhook] Dispatched instant push alert to registered Parent ID",
          ],
        }));
      }, 350);

      setTimeout(() => {
        setSimState((prev) => ({
          ...prev,
          status: "success",
          metrics: { latency: "62.4ms", status: "RECORDED & PUSHED", event: "line:alert:sent" },
        }));
      }, 750);
    } else if (activeProject === "blackboard") {
      setTimeout(() => {
        setSimState((prev) => ({
          ...prev,
          logs: [
            ...prev.logs,
            "✨ [Zustand Store] Immediate UI state transition (0ms UI latency)",
            "🔀 [Fractional Indexing] Task moved from 'Backlog' to 'In Progress' at index 1.5",
            "⏱️ [Debounce Engine] Bundled batch PATCH request dispatched to route handler",
            "💾 [Prisma Client] Atomic batch transaction updated column order",
          ],
        }));
      }, 300);

      setTimeout(() => {
        setSimState((prev) => ({
          ...prev,
          status: "success",
          metrics: { latency: "0ms UI / 48ms Sync", status: "SYNCED", event: "task:reorder:batch" },
        }));
      }, 650);
    } else {
      // matcha
      setTimeout(() => {
        setSimState((prev) => ({
          ...prev,
          logs: [
            ...prev.logs,
            "📄 [Multer Middleware] Streaming PDF buffer into memory with SHA-256 hash",
            "☁️ [AWS S3 SDK] Uploaded candidate resume to secure bucket: resumes/candidate-492",
            "🧠 [Match Engine] Extracted skills (React, TypeScript, Node.js) against job spec",
            "📊 [Score Calculator] Job match compatibility computed: 94% Fit",
          ],
        }));
      }, 350);

      setTimeout(() => {
        setSimState((prev) => ({
          ...prev,
          status: "success",
          metrics: { latency: "88.2ms", status: "ANALYZED", event: "candidate:score:94%" },
        }));
      }, 800);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-blueprint-950/85 backdrop-blur-md">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Live System Simulator"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0A1830] text-blueprint-100 rounded-[10px] border border-blueprint-800 shadow-2xl z-10 overflow-hidden text-left"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 border-b border-blueprint-800 bg-[#141B26]">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono-code font-bold flex items-center gap-1.5 border"
                  style={{
                    backgroundColor: `${theme.accent}15`,
                    color: theme.accent,
                    borderColor: `${theme.accent}40`,
                  }}
                >
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>Real-Time Event Simulator</span>
                </span>
                <span className="text-xs font-mono-code text-blueprint-400">Interactive Test Bench</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {projectConfig.title} <span className="text-blueprint-400 text-sm font-normal font-mono-code">— Live Event Pipeline</span>
              </h3>
            </div>

            {/* Project Switcher */}
            <div className="flex items-center gap-2">
              <div className="flex flex-wrap items-center gap-1 p-1 rounded-[4px] bg-blueprint-900 border border-blueprint-800">
                {portfolioData.featuredProjects.map((p) => {
                  const isActive = activeProject === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActiveProject(p.id);
                        setSimState({ status: "idle", logs: [], metrics: null });
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition-all flex items-center gap-1 ${
                        isActive
                          ? "bg-draft-500 text-white shadow-md shadow-draft-500/20"
                          : "text-blueprint-400 hover:text-white hover:bg-blueprint-800"
                      }`}
                    >
                      <span>#{p.number}</span>
                      <span>{p.title}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-[4px] bg-blueprint-900 hover:bg-blueprint-800 text-blueprint-400 hover:text-white transition-colors border border-blueprint-800"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Interactive Trigger Control Box */}
          <div className="p-6 bg-[#111722] border-b border-blueprint-800/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono-code font-bold text-blueprint-400 uppercase tracking-wider block">
                  Simulate Real-World Client Action
                </span>
                <p className="text-xs text-blueprint-300 mt-1">
                  {activeProject === "omnipos" && t("Simulate Cashier/QR sending 2x Pad Thai order to live kitchen display", "จำลองแคชเชียร์/โต๊ะส่งออร์เดอร์ผัดไทย 2 จานเข้าจอครัวแบบเรียลไทม์")}
                  {activeProject === "mystudentroom" && t("Simulate RFID gate tap for student attendance logging", "จำลองการแตะบัตร RFID เช็กชื่อนักเรียนพร้อมยิงแจ้งเตือน LINE")}
                  {activeProject === "blackboard" && t("Simulate dragging Kanban task with instant 60fps optimistic update", "จำลองการลากวางการ์ด Kanban แบบ Optimistic UI 0ms")}
                  {activeProject === "matcha" && t("Simulate candidate uploading PDF resume with S3 stream & skill scoring", "จำลองผู้สมัครอัปโหลดเรซูเม่ ส่งตรงเข้า S3 พร้อมคำนวณคะแนนความเหมาะสม")}
                </p>
              </div>

              <button
                onClick={runSimulation}
                disabled={simState.status === "running"}
                className={`px-5 py-2.5 rounded-[4px] font-mono-code font-bold text-xs text-white flex items-center gap-2 shadow-lg transition-all shrink-0 ${
                  simState.status === "running" ? "opacity-60 cursor-not-allowed bg-blueprint-700" : "hover:scale-105"
                }`}
                style={{ backgroundColor: theme.accent }}
              >
                {simState.status === "running" ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>{t("Trigger Live Event", "กดทดสอบยิง Event")}</span>
                  </>
                )}
              </button>
            </div>

            {/* Architecture Node Visual Track */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs font-mono-code">
              <div className={`p-3 rounded-[4px] border transition-all ${simState.status !== "idle" ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300" : "border-blueprint-800 bg-blueprint-900/60 text-blueprint-500"}`}>
                <div className="font-bold flex items-center justify-center gap-1.5"><Smartphone className="w-3.5 h-3.5" /> 1. Client Event</div>
                <div className="text-[10px] opacity-75 mt-0.5">Payload Ingest</div>
              </div>
              <div className={`p-3 rounded-[4px] border transition-all ${simState.logs.length > 1 ? "border-sky-500/50 bg-sky-500/10 text-sky-300" : "border-blueprint-800 bg-blueprint-900/60 text-blueprint-500"}`}>
                <div className="font-bold flex items-center justify-center gap-1.5"><Server className="w-3.5 h-3.5" /> 2. Gateway Auth</div>
                <div className="text-[10px] opacity-75 mt-0.5">Zod & JWT Guard</div>
              </div>
              <div className={`p-3 rounded-[4px] border transition-all ${simState.logs.length > 2 ? "border-purple-500/50 bg-purple-500/10 text-purple-300" : "border-blueprint-800 bg-blueprint-900/60 text-blueprint-500"}`}>
                <div className="font-bold flex items-center justify-center gap-1.5"><Database className="w-3.5 h-3.5" /> 3. Transaction</div>
                <div className="text-[10px] opacity-75 mt-0.5">Prisma ACID DB</div>
              </div>
              <div className={`p-3 rounded-[4px] border transition-all ${simState.status === "success" ? "border-amber-500/50 bg-amber-500/10 text-amber-300" : "border-blueprint-800 bg-blueprint-900/60 text-blueprint-500"}`}>
                <div className="font-bold flex items-center justify-center gap-1.5"><Zap className="w-3.5 h-3.5" /> 4. Real-Time Push</div>
                <div className="text-[10px] opacity-75 mt-0.5">Sub-50ms Delivery</div>
              </div>
            </div>
          </div>

          {/* Real-Time Terminal Log Stream */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto bg-[#080C14] font-mono-code text-xs space-y-2.5">
            <div className="text-blueprint-500 flex items-center justify-between pb-2 border-b border-blueprint-900 text-[11px]">
              <span>// SYSTEM LOG STREAM & REAL-TIME PACKET TRACE</span>
              {simState.metrics && (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> LATENCY: {simState.metrics.latency}
                </span>
              )}
            </div>

            {simState.logs.length === 0 ? (
              <div className="py-12 text-center text-blueprint-600 space-y-2">
                <Sparkles className="w-6 h-6 mx-auto opacity-40" />
                <p>Click "Trigger Live Event" above to observe the end-to-end event execution pipeline.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {simState.logs.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-2.5 rounded-lg bg-blueprint-900/80 border border-blueprint-800/80 text-blueprint-300 leading-relaxed"
                  >
                    {log}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-4 bg-[#141B26] border-t border-blueprint-800 flex items-center justify-between text-xs font-mono-code">
            <div className="flex items-center gap-2 text-blueprint-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Event Engine: Connected</span>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-blueprint-800 hover:bg-blueprint-700 text-blueprint-200 transition-colors"
            >
              {t("Close Simulator", "ปิดหน้าต่างจำลอง")}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
