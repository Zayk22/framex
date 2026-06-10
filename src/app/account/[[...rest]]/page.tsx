import { Metadata } from "next";
import AccountPage from "@/components/account/AccountPage";

export const metadata: Metadata = {
  title: "Account | Happu TV",
  description: "Manage your account and membership settings.",
};

export default function AccountPageRoute() {
  return <AccountPage />;
}