import {
  Zap, Shield, Calculator, Briefcase, Building2, BookOpen, Handshake,
  BarChart3, FileText, FileCheck, Search, Scale, Landmark, ClipboardList,
  DollarSign, Package, Users,
} from "lucide-react";

export const serviceCategories = [
  {
    icon: Zap,
    title: "Digital Transformation",
    desc: "Modernize your business operations with technology driven solutions.",
    items: [
      { icon: Zap, name: "Integrated Solutions" },
      { icon: Zap, name: "Process Automation" },
      { icon: BarChart3, name: "ERP Implementation" },
      { icon: FileText, name: "Digital Strategy" },
      { icon: FileText, name: "E Commerce" },
      { icon: FileText, name: "Custom Software Development" },
    ],
  },
  {
    icon: Shield,
    title: "Audit & Assurance",
    desc: "Comprehensive audit services ensuring compliance and transparency.",
    items: [
      { icon: FileCheck, name: "External Audit" },
      { icon: Search, name: "Internal Audit" },
      { icon: Scale, name: "IFRS Advisory Services" },
      { icon: BarChart3, name: "Business Valuation" },
      { icon: Shield, name: "Forensic Audit & Fraud Investigation" },
      { icon: Landmark, name: "AML Compliance" },
      { icon: ClipboardList, name: "RERA Audit" },
    ],
  },
  {
    icon: Calculator,
    title: "Tax Consultancy",
    desc: "Expert tax advisory for direct and indirect tax matters in the UAE.",
    items: [
      { icon: Calculator, name: "UAE Corporate Tax" },
      { icon: Landmark, name: "International Taxation" },
      { icon: Scale, name: "Transfer Pricing" },
      { icon: DollarSign, name: "Value Added Tax (VAT)" },
      { icon: Package, name: "Excise Tax" },
      { icon: FileText, name: "Customs Services" },
    ],
  },
  {
    icon: Briefcase,
    title: "Business Advisory",
    desc: "Strategic advisory services to optimize and grow your business.",
    items: [
      { icon: BarChart3, name: "Market Research & Business Plans" },
      { icon: FileText, name: "Feasibility Studies" },
      { icon: DollarSign, name: "CFO Support Services" },
      { icon: Landmark, name: "Capital Raising Support" },
      { icon: ClipboardList, name: "Policy & Procedure Manuals" },
      { icon: Package, name: "Fixed Assets Tagging" },
      { icon: Users, name: "Human Resources Consulting" },
    ],
  },
  {
    icon: Building2,
    title: "Company Incorporations & Liquidations",
    desc: "End-to-end company formation, restructuring and liquidation support.",
    items: [
      { icon: Building2, name: "Company Incorporations" },
      { icon: Landmark, name: "Offshore Registered Agent – JAFZA" },
      { icon: FileCheck, name: "Company Liquidations Support" },
      { icon: Scale, name: "Corporate Restructuring" },
    ],
  },
  {
    icon: BookOpen,
    title: "Outsourced Accounting",
    desc: "Professional accounting and bookkeeping services tailored to your needs.",
    items: [
      { icon: BookOpen, name: "Full-cycle Bookkeeping" },
      { icon: FileText, name: "Financial Reporting" },
      { icon: BarChart3, name: "Management Accounting" },
    ],
  },
  {
    icon: Handshake,
    title: "M&A Consulting",
    desc: "Strategic merger and acquisition consulting for growth oriented businesses.",
    items: [
      { icon: Search, name: "Due Diligence" },
      { icon: Scale, name: "Deal Structuring" },
      { icon: BarChart3, name: "Valuation Advisory" },
    ],
  },
  {
    icon: Zap,
    title: "E commerce",
    desc: "Boost your sales potential with E commerce solutions.",
    items: [
      { icon: Zap, name: "Ecommerce Development" },
      { icon: BarChart3, name: "Amazon" },
      { icon: FileText, name: "Ebay" },
      { icon: FileText, name: "Noon" },
      { icon: FileText, name: "Etsy" },
      { icon: FileText, name: "Social Media Platforms" },
    ],
  },
  {
    icon: Zap,
    title: "ERP Solutions",
    desc: "Empower your business operations with ERP implementation, support and revamping.",
    items: [
      { icon: Zap, name: "ERP Customize Web Applications" },
      { icon: BarChart3, name: "SAP Business One" },
      { icon: FileText, name: "Odoo" },
      { icon: FileText, name: "Sage" },
      { icon: FileText, name: "QuickBooks" },
      { icon: FileText, name: "ZohoBooks" },
      { icon: FileText, name: "Others" },
    ],
  },
];

export type ServiceCategory = (typeof serviceCategories)[number];
