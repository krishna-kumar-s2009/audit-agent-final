# Audit Intelligence Console & Support Agent 

> **An enterprise-grade, context-aware compliance and customer support agent powered by React, Vite, Tailwind CSS, and Groq AI, featuring dynamic "Hindsight Memory" injection.**

---

## 🚀 Overview

Generic AI chatbots fail in high-stakes environments because they treat every interaction in isolation. The **Audit Intelligence Console** solves this by acting as a localized compliance and support agent that retains, manages, and dynamically injects historical audit findings and customer context into real-time inference payloads. 

---

## 🎯 The Problem

Traditional enterprise AI tools lack persistent memory of previous audits or past support tickets. Auditors and support teams waste valuable time manually cross-referencing legacy findings, leading to repetitive troubleshooting, compliance blind spots, and unnecessary escalations.

---

## 💡 The Solution: Dynamic "Hindsight Memory"

Audit Intelligence bridges the gap by introducing dynamic context retention:
*   **Selective Context Injection:** Toggle Hindsight Memory **ON** or **OFF** directly from the UI to instantly switch between amnesia and deep historical recall.
*   **Cumulative Compliance Memory:** Securely injects isolated JSON objects containing historical audit findings (such as past vendor access reviews and auditor warnings) directly into the system prompt.
*   **Escalation Prevention:** Resolves recurring compliance issues and customer friction points proactively before human intervention is required.

---

## ⚙️ How It Works

1. **User Initiation:** The operator launches the glassmorphic B2B console featuring an organic drifting star background.
2. **Context Toggle:** The user toggles Hindsight Memory via the UI, modifying the underlying React state.
3. **Payload Restructuring:** The application dynamically appends a hidden `system` role payload containing historical context structures (`CORP-7729-A`) alongside live user inputs.
4. **High-Speed Inference:** The combined prompt is shot directly to the Groq API utilizing the `openai/gpt-oss-20b` model via specialized LPU architecture for instantaneous generation.

---

## 🛠️ Technology Stack

*   **Frontend:** React, Vite
*   **Styling & UI:** Tailwind CSS (Custom glassmorphic components, infinite star particle animations)
*   **Inference Engine:** Groq API (`openai/gpt-oss-20b`)
*   **State & Memory Management:** Dynamic JSON context injection algorithms

---

## 🌟 Key Features

*   **Glassmorphic B2B Interface:** Rich Forest Green (`#1F3D2B`) and Sand Beige styling accented with glowing Electric Purple (`#8B5CF6`).
*   **Organic Universe Animation:** Custom CSS radial-gradient background creating an ambient, distraction-free environment.
*   **Real-time Memory Toggle:** Instant visual confirmation of state changes during live demonstrations.
*   **Micro-interactions:** Smooth `slideUpFade` message keyframes and custom bouncing pulse indicators.

---

## 📌 Project Status

Hackathon project – Finalized and ready for submission.

🔗 **Repository:** [https://github.com/krishna-kumar-s2009/audit-agent-final](https://github.com/krishna-kumar-s2009/audit-agent-final)
