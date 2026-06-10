"use client";

import { useState } from "react";
import { useUser, useClerk, useSignIn } from "@clerk/nextjs";
import { UserProfile } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User, Mail, Phone, Shield, Key, Trash2, Crown, Calendar,
  CreditCard, Check, AlertTriangle, X, Edit3
} from "lucide-react";

// Mock membership data (replace with real data later)
const MOCK_MEMBERSHIP = {
  plan: "Standard Plan",
  tier: "Standard Plan",          // "Standard Plan", "Covenant Member", "Super Covenant Member"
  status: "Active",
  memberSince: "2024-01-15",
  nextBilling: "2025-01-15",
  features: [
    "1080p Full HD Video Resolution",
    "Streaming with ads",
    "Multi-Device Access",
  ],
};

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const { signIn } = useSignIn();
  const router = useRouter();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-matte-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-matte-700 border-t-crimson-DEFAULT" />
      </div>
    );
  }

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  const handleDeleteAccount = async () => {
    if (!signIn || !user) return;
    setDeleteError("");
    setIsDeleting(true);
    try {
      // Re-authenticate with password
      const { supportedFirstFactors } = await signIn.create({
        identifier: user.primaryEmailAddress?.emailAddress || "",
      });
      const passwordFactor = supportedFirstFactors?.find(
        (factor) => factor.strategy === "password"
      );
      if (!passwordFactor) throw new Error("Password authentication not available");

      await signIn.attemptFirstFactor({
        strategy: "password",
        password: deletePassword,
      });

      // Now delete the user
      await user.delete();
      await signOut();
      router.push("/account-deleted");
    } catch (error) {
      console.error(error);
      setDeleteError("Incorrect password. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <main className="min-h-screen bg-matte-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-display text-white">Account</h1>
          <p className="mt-1 text-body-lg text-matte-400">
            Manage your membership and account settings.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.02 }}
        >
          <a href="#membership" className="rounded-lg border border-matte-700 px-4 py-2 text-caption text-white transition-colors hover:bg-matte-800">
            View Full Membership Details
          </a>
          <a href="#security" className="rounded-lg border border-matte-700 px-4 py-2 text-caption text-white transition-colors hover:bg-matte-800">
            Update Account Information
          </a>
          <button className="rounded-lg border border-matte-700 px-4 py-2 text-caption text-white transition-colors hover:bg-matte-800">
            Manage Subscription
          </button>
        </motion.div>

        {/* Overview Section */}
        <motion.section
          id="overview"
          className="rounded-2xl border border-matte-800 bg-matte-900 p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <h2 className="font-display text-heading-2 text-white">
            Overview
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-crimson-DEFAULT" />
              <div>
                <p className="text-caption text-matte-500">Name</p>
                <p className="text-body text-white">
                  {user.fullName || user.username || user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-crimson-DEFAULT" />
              <div>
                <p className="text-caption text-matte-500">Email</p>
                <div className="flex items-center gap-2">
                  <p className="text-body text-white">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                  <button
                    onClick={() => setShowProfileModal(true)}
                    className="text-caption text-crimson-DEFAULT hover:underline"
                    title="Edit profile details"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-crimson-DEFAULT" />
              <div>
                <p className="text-caption text-matte-500">Phone</p>
                <div className="flex items-center gap-2">
                  <p className="text-body text-white">
                    {user.primaryPhoneNumber?.phoneNumber || "Not added"}
                  </p>
                  <button
                    onClick={() => setShowProfileModal(true)}
                    className="text-caption text-crimson-DEFAULT hover:underline"
                    title="Edit profile details"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-crimson-DEFAULT" />
              <div>
                <p className="text-caption text-matte-500">Membership</p>
                <p className="text-body font-semibold text-crimson-DEFAULT">
                  {MOCK_MEMBERSHIP.plan}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Membership Section */}
        <motion.section
          id="membership"
          className="rounded-2xl border border-matte-800 bg-matte-900 p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-display text-heading-2 text-white">
            Membership
          </h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="h-5 w-5 text-gold-DEFAULT" />
                <div>
                  <p className="text-body font-semibold text-white">
                    {MOCK_MEMBERSHIP.plan}
                  </p>
                  <p className="text-caption text-matte-500">
                    Tier: {MOCK_MEMBERSHIP.tier} • Status:{" "}
                    <span className="text-emerald-400">
                      {MOCK_MEMBERSHIP.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-matte-700 px-4 py-2 text-caption text-white transition-colors hover:bg-matte-800">
                  Upgrade
                </button>
                <button className="rounded-lg border border-matte-700 px-4 py-2 text-caption text-white transition-colors hover:bg-matte-800">
                  Downgrade
                </button>
              </div>
            </div>

            <div className="border-t border-matte-800 pt-4">
              <p className="text-caption font-semibold uppercase tracking-wider text-matte-400">
                Included Features
              </p>
              <ul className="mt-2 space-y-2">
                {MOCK_MEMBERSHIP.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-caption text-matte-300"
                  >
                    <Check className="h-4 w-4 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 border-t border-matte-800 pt-4">
              <div className="flex items-center gap-2 text-caption text-matte-500">
                <Calendar className="h-4 w-4" />
                Member since: {MOCK_MEMBERSHIP.memberSince}
              </div>
              <div className="flex items-center gap-2 text-caption text-matte-500">
                <CreditCard className="h-4 w-4" />
                Next billing: {MOCK_MEMBERSHIP.nextBilling}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="rounded-lg border border-matte-700 px-4 py-2 text-caption text-white transition-colors hover:bg-matte-800">
                View Benefits
              </button>
              <button className="rounded-lg border border-matte-700 px-4 py-2 text-caption text-white transition-colors hover:bg-matte-800">
                Billing History
              </button>
            </div>
          </div>
        </motion.section>

        {/* Security Settings */}
        <motion.section
          id="security"
          className="rounded-2xl border border-matte-800 bg-matte-900 p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="font-display text-heading-2 text-white">
            Security & Account Settings
          </h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-crimson-DEFAULT" />
                <div>
                  <p className="text-body text-white">Password</p>
                  <p className="text-caption text-matte-500">
                    Last changed: never
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowProfileModal(true)}
                className="rounded-lg border border-matte-700 px-4 py-2 text-caption text-white transition-colors hover:bg-matte-800"
              >
                Change Password
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-crimson-DEFAULT" />
                <div>
                  <p className="text-body text-white">
                    Two-Factor Authentication
                  </p>
                  <p className="text-caption text-matte-500">
                    {user.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowProfileModal(true)}
                className="rounded-lg border border-matte-700 px-4 py-2 text-caption text-white transition-colors hover:bg-matte-800"
              >
                {user.twoFactorEnabled ? "Manage" : "Enable"}
              </button>
            </div>
          </div>
        </motion.section>

        {/* Delete Account */}
        <motion.section
          className="rounded-2xl border border-red-900/50 bg-red-900/10 p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display text-heading-2 text-red-400">
            Danger Zone
          </h2>
          <p className="mt-2 text-caption text-matte-400">
            Once you delete your account, all your data will be permanently removed. This action cannot be undone.
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="mt-4 flex items-center gap-2 rounded-lg border border-red-800 px-4 py-2 text-caption text-red-400 transition-colors hover:bg-red-900/30"
          >
            <Trash2 className="h-4 w-4" />
            Delete Account
          </button>
        </motion.section>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-matte-800 bg-matte-900 p-6 shadow-elevated"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-heading-2 text-white">
                Delete Account
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-matte-500 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3 rounded-lg border border-red-900/50 bg-red-900/10 p-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                <p className="text-caption text-matte-300">
                  This action is irreversible. All your personal data, watchlist, and viewing history will be permanently deleted. Some data may be retained for legal purposes for up to 30 days.
                </p>
              </div>
              <p className="text-caption text-matte-400">
                Please enter your password to confirm.
              </p>
              <input
                type="password"
                placeholder="Your password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="w-full rounded-lg border border-matte-700 bg-matte-800 px-4 py-2 text-white placeholder:text-matte-500"
              />
              {deleteError && (
                <p className="text-caption text-red-400">{deleteError}</p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 rounded-lg border border-matte-700 px-4 py-2 text-caption text-white transition-colors hover:bg-matte-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting || !deletePassword}
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-caption font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete My Account"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Profile Edit Modal (Clerk UserProfile) */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative max-h-[90vh] overflow-auto rounded-2xl bg-matte-900 shadow-elevated">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-matte-800 p-1 text-matte-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <UserProfile />
          </div>
        </div>
      )}
    </main>
  );
}