export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "When and where is ACM23?",
    answer: "ACM23 will be held in October 2026 in Hanoi, Vietnam. The exact dates and venue will be announced soon.",
  },
  {
    question: "How do I register for the conference?",
    answer: "You can register online through our Registration page. Fill in the required information and you will receive a confirmation email.",
  },
  {
    question: "What is the deadline for abstract submission?",
    answer: "The abstract submission deadline is July 15, 2026. Please submit your abstract through the Abstract Submission page.",
  },
  {
    question: "What types of presentations are available?",
    answer: "You can choose between oral presentation and poster presentation when submitting your abstract.",
  },
  {
    question: "Do I need a visa to visit Vietnam?",
    answer: "Visa requirements depend on your nationality. Many Asian countries have visa exemption or e-visa options for Vietnam. Please check with your local Vietnamese embassy for details.",
  },
  {
    question: "What is the official language of the conference?",
    answer: "The official language of ACM23 is English.",
  },
  {
    question: "How can I contact the organizers?",
    answer: "Please visit our Contact page or email us at contact@acm23.org for any inquiries.",
  },
];
