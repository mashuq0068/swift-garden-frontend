"use client"
import {
  Monitor,
  Stethoscope,
  User,
  UserCheck,
  TestTube,
  Banknote,
  Users,
  Shield,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  ClipboardList,
  
} from "lucide-react";

// Sample data with updated icons
const SidebarItems = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "cpMed",
      logo: GalleryVerticalEnd,
      plan: "Control Panel",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Monitor, 
    },
    {
      title: "Doctors",
      icon: Stethoscope, 
      items: [
        {
          title: "Create Doctor",
          url: "/doctor/create-doctor",
        },
        {
          title: "View Doctors",
          url: "/doctor/view-doctors",
        },
        {
          title: "Doctor Transaction",
          url: "/doctor/doctor-transaction",
        },
        {
          title: "Doctor Ledger",
          url: "/doctor/doctor-ledger",
        },
        {
          title: "Commission Tracking",
          url: "/doctor/commission-tracking",
        },
      ],
    },
    {
      title: "Agents",
      icon: User, 
      items: [
        {
          title: "Create Agent",
          url: "/agent/create-agent",
        },
        {
          title: "View Agents",
          url: "/agent/view-agents",
        },
        {
          title: "Agent Transaction",
          url: "/agent/agent-transaction",
        },
        {
          title: "Agent Ledger",
          url: "/agent/agent-ledger",
        },
        {
          title: "Commission Tracking",
          url: "/agent/commission-tracking",
        },
      ],
    },
    {
      title: "Patients",
      icon: UserCheck, 
      items: [
        {
          title: "Create Patient",
          url: "/patient/create-patient",
        },
        {
          title: "View Patients",
          url: "/patient/view-patients",
        },
        {
          title: "Patient Transaction",
          url: "/patient/patient-transaction",
        },
        {
          title: "Patient Ledger",
          url: "/patient/Patient-ledger",
        },
        {
          title: "Book Appointment",
          url: "/patient/doctor-appointment",
        },
      ],
    },
    {
      title: "Tests",
      icon: TestTube, 
      items: [
        // {
        //   title: "Create Test",
        //   url: "/test/create-test",
        // },
        {
          title: "View Tests",
          url: "/test/view-tests",
        },
        {
          title: "Invoice/Bill",
          url: "/test/invoice",
        },
        {
          title: "Test Result Input",
          url: "/test/test-result-input",
        },
        {
          title: "Test Report Generation",
          url: "/test/test-report-generation",
        },
      ],
    },
    {
      title: "Accounts",
      icon: Banknote, 
      items: [
        {
          title: "Income Management",
          url: "/accounts/income-management",
        },
         {
          title: "New Expense",
          url: "/accounts/new-expense",
        },
        {
          title: "Field Expense",
          url: "/accounts/field-expense",
        },
        {
          title: "View All Expenses",
          url: "/accounts/view-all-expenses",
        },
      ],
    },
    {
      title: "Reports",
      icon: ClipboardList,
      items: [
        {
          title: "Profit/loss Tracking",
          url: "/reports/profit-loss-tracking",
        },
        {
          title: "Sales Report",
          url: "/reports/sales-report",
        },
        {
          title: "Expense Report",
          url: "/reports/expense-report",
        },
        {
          title: "Commission Tracking",
          url: "/reports/commission-tracking-report",
        },
        {
          title: "Income Report",
          url: "/reports/income-report",
        },
      ],
    },
    {
      title: "HR",
      icon: Users, 
      items: [
        {
          title: "Employee Management",
          url: "/hr/employee-management",
        },
        {
          title: "Payroll Management",
          url: "/hr/payroll-management",
        },
        {
          title: "Leave Management",
          url: "/hr/leave-management",
        },
        {
          title: "Attendance Management",
          url: "/hr/attendance-management",
        },
        // {
        //   title: "Performance Tracking",
        //   url: "/hr/performance-tracking",
        // },
      ],
    },
    {
      title: "User Role",
      url: "/user-role",
      icon: Shield, 
    },
  ],
};

export default SidebarItems;
