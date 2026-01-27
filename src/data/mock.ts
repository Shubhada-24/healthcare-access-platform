export type Severity = "low" | "medium" | "high";

export interface Appointment {
  id: string;
  patientName: string;
  time: string;
  severity: Severity;
  concern: string;
}

export const doctorAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "Ramesh Kumar",
    time: "09:15 AM",
    severity: "high",
    concern: "Severe chest pain and breathlessness since morning.",
  },
  {
    id: "2",
    patientName: "Asha Devi",
    time: "10:00 AM",
    severity: "medium",
    concern: "Fever and cough for 3 days.",
  },
  {
    id: "3",
    patientName: "Mohit Singh",
    time: "11:30 AM",
    severity: "low",
    concern: "Routine blood pressure follow-up.",
  },
];

export const patientReminders = [
  { id: 1, title: "BP check reminder", time: "Today · 6:00 PM" },
  { id: 2, title: "Diabetes review", time: "Friday · 10:30 AM" },
];

export const awarenessVideos = [
  {
    id: 1,
    title: "Recognising heart attack warning signs",
    duration: "3 min",
  },
  {
    id: 2,
    title: "Managing diabetes with daily habits",
    duration: "4 min",
  },
];

export const nearestServices = [
  {
    id: "hospital",
    label: "District Hospital (2.3 km)",
    type: "Hospital",
  },
  {
    id: "worker",
    label: "ASHA Worker - Sunita (0.5 km)",
    type: "ASHA Worker",
  },
  {
    id: "ambulance",
    label: "108 Ambulance Stand (1.1 km)",
    type: "Ambulance",
  },
  {
    id: "blood",
    label: "City Blood Bank (3.0 km)",
    type: "Blood Bank",
  },
];

export const workerPatients = [
  {
    id: "p1",
    name: "Ramesh Kumar",
    village: "Ward 5",
    risk: "high" as Severity,
    lastVisit: "2 days ago",
  },
  {
    id: "p2",
    name: "Seema Devi",
    village: "Ward 3",
    risk: "medium" as Severity,
    lastVisit: "1 week ago",
  },
  {
    id: "p3",
    name: "Rahul Verma",
    village: "Ward 2",
    risk: "low" as Severity,
    lastVisit: "3 weeks ago",
  },
];

export const governmentSchemes = [
  {
    id: "ayushman",
    name: "Ayushman Bharat",
    description:
      "Cashless treatment up to ₹5 lakh per family per year in empanelled hospitals.",
  },
  {
    id: "jsy",
    name: "Janani Suraksha Yojana (JSY)",
    description:
      "Incentives for institutional delivery and antenatal care for pregnant women.",
  },
  {
    id: "vaccination",
    name: "Universal Immunisation Programme",
    description:
      "Free vaccines for children and pregnant women at government facilities.",
  },
  {
    id: "nutrition",
    name: "Nutrition Schemes",
    description:
      "Supplementary nutrition and counselling through Anganwadi centres.",
  },
];

export const mockDoctorPatientChat = [
  {
    from: "patient",
    text: "Namaste doctor, I have chest pain from morning.",
    time: "09:05 AM",
  },
  {
    from: "doctor",
    text: "Namaste. Is the pain going to your left arm or jaw?",
    time: "09:06 AM",
  },
  {
    from: "patient",
    text: "Yes, towards left arm and I feel sweating.",
    time: "09:07 AM",
  },
  {
    from: "doctor",
    text: "This can be serious. Please do not wait. Call ambulance 108 and go to nearest hospital immediately.",
    time: "09:08 AM",
  },
];

export const mockWorkerPatientChat = [
  {
    from: "worker",
    text: "Namaste, did you take your BP medicine in the morning?",
    time: "08:15 AM",
  },
  {
    from: "patient",
    text: "Yes didi, I took it after breakfast.",
    time: "08:16 AM",
  },
  {
    from: "worker",
    text: "Very good. I will visit tomorrow to check BP and explain diet.",
    time: "08:17 AM",
  },
];

