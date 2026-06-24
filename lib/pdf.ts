/* ============================================================
   NRFFN — client-side PDF generation (mock documents)
   Branded investment receipts and academy certificates.
   ============================================================ */
import { jsPDF } from "jspdf";

const ROYAL: [number, number, number] = [7, 31, 68];
const ROYAL_2: [number, number, number] = [16, 70, 163];
const GOLD: [number, number, number] = [201, 162, 39];
const INK: [number, number, number] = [33, 43, 60];
const MUTED: [number, number, number] = [110, 122, 140];

const naira = (n: number) =>
  "NGN " + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });

export type ReceiptData = {
  reference: string;
  date: string;
  investorName: string;
  property: string;
  location?: string;
  model: string;
  plan: string;
  paymentMethod: string;
  units: number;
  amount: number;
};

export function downloadReceipt(data: ReceiptData) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();

  // Header band
  doc.setFillColor(...ROYAL);
  doc.rect(0, 0, W, 120, "F");
  doc.setTextColor(...GOLD);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("NRFFN", 48, 58);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Nigerian Realtors Financial Freedom Network", 48, 76);
  doc.setFontSize(9);
  doc.setTextColor(206, 215, 230);
  doc.text("OFFICIAL PAYMENT RECEIPT", 48, 98);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("RECEIPT", W - 48, 58, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Ref: ${data.reference}`, W - 48, 76, { align: "right" });
  doc.text(data.date, W - 48, 90, { align: "right" });

  // Amount panel
  let y = 168;
  doc.setFillColor(245, 248, 252);
  doc.roundedRect(48, y - 34, W - 96, 70, 8, 8, "F");
  doc.setTextColor(...MUTED);
  doc.setFontSize(9);
  doc.text("AMOUNT PAID", 70, y - 12);
  doc.setTextColor(...ROYAL_2);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text(naira(data.amount), 70, y + 18);

  // Detail rows
  y += 78;
  const rows: [string, string][] = [
    ["Paid by", data.investorName],
    ["Property", data.property],
    ...(data.location ? ([["Location", data.location]] as [string, string][]) : []),
    ["Investment model", data.model],
    ["Payment plan", data.plan],
    ["Units", String(data.units)],
    ["Payment method", data.paymentMethod],
    ["Status", "Confirmed"],
  ];

  doc.setFontSize(10);
  rows.forEach(([label, value]) => {
    doc.setDrawColor(232, 237, 243);
    doc.line(48, y + 6, W - 48, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    doc.text(label, 56, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...INK);
    doc.text(value, W - 56, y, { align: "right" });
    y += 30;
  });

  // Footer
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(
    "This is a system-generated receipt. Title documents and allocation letters follow after verification.",
    48,
    y + 24,
    { maxWidth: W - 96 }
  );
  doc.setFillColor(...GOLD);
  doc.rect(0, doc.internal.pageSize.getHeight() - 14, W, 14, "F");

  doc.save(`NRFFN-Receipt-${data.reference}.pdf`);
}

export function downloadDocument(title: string, meta: [string, string][]) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  doc.setFillColor(...ROYAL);
  doc.rect(0, 0, W, 96, "F");
  doc.setTextColor(...GOLD);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("NRFFN", 48, 50);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Nigerian Realtors Financial Freedom Network", 48, 70);

  doc.setTextColor(...ROYAL);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.text(title, 48, 144);

  let y = 188;
  doc.setFontSize(10);
  meta.forEach(([label, value]) => {
    doc.setDrawColor(232, 237, 243);
    doc.line(48, y + 6, W - 48, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    doc.text(label, 56, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...INK);
    doc.text(value, W - 56, y, { align: "right" });
    y += 30;
  });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text("System-generated NRFFN document for member records.", 48, y + 24, { maxWidth: W - 96 });
  doc.setFillColor(...GOLD);
  doc.rect(0, doc.internal.pageSize.getHeight() - 14, W, 14, "F");
  doc.save(`NRFFN-${title.replace(/[^a-z0-9]+/gi, "-")}.pdf`);
}

export type CertificateData = {
  recipient: string;
  course: string;
  date: string;
  certificateId: string;
};

export function downloadCertificate(data: CertificateData) {
  const doc = new jsPDF({ unit: "pt", format: "a4", orientation: "landscape" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();

  // Background + border
  doc.setFillColor(...ROYAL);
  doc.rect(0, 0, W, H, "F");
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(28, 28, W - 56, H - 56, 10, 10, "F");
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(2);
  doc.roundedRect(44, 44, W - 88, H - 88, 8, 8, "S");

  doc.setTextColor(...GOLD);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("NRFFN ACADEMY", W / 2, 110, { align: "center" });

  doc.setTextColor(...MUTED);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.text("CERTIFICATE OF COMPLETION", W / 2, 140, { align: "center" });

  doc.setTextColor(...MUTED);
  doc.setFontSize(11);
  doc.text("This certifies that", W / 2, 190, { align: "center" });

  doc.setTextColor(...ROYAL);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(34);
  doc.text(data.recipient, W / 2, 232, { align: "center" });

  doc.setTextColor(...MUTED);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("has successfully completed the course", W / 2, 268, { align: "center" });

  doc.setTextColor(...ROYAL_2);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(data.course, W / 2, 304, { align: "center" });

  // Signature / meta line
  const baseY = H - 110;
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1);
  doc.line(W / 2 - 230, baseY, W / 2 - 70, baseY);
  doc.line(W / 2 + 70, baseY, W / 2 + 230, baseY);
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(data.date, W / 2 - 150, baseY + 18, { align: "center" });
  doc.text("NRFFN Academy", W / 2 + 150, baseY + 18, { align: "center" });
  doc.setTextColor(...MUTED);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Date issued", W / 2 - 150, baseY + 34, { align: "center" });
  doc.text("Authorised signature", W / 2 + 150, baseY + 34, { align: "center" });

  doc.setTextColor(...MUTED);
  doc.setFontSize(8);
  doc.text(`Certificate ID: ${data.certificateId}`, W / 2, H - 56, { align: "center" });

  doc.save(`NRFFN-Certificate-${data.certificateId}.pdf`);
}
