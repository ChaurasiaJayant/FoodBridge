import { useState } from "react";

import { AlertCircle, Building2, CheckCircle2, Loader2, X } from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";

import { createClaim } from "../../services/api.js";

const ClaimModal = ({ donation, onClose, onSuccess }) => {
  const { user } = useAuth();

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  // Logged-in NGO's own profile ID
  const ngoId = user?.profileId;

  // ======================================================
  // CLAIM DONATION
  // ======================================================

  const handleClaim = async () => {
    if (!ngoId) {
      setError(
        "Please complete your NGO Registration before claiming donations.",
      );
      return;
    }

    if (!donation?.Donation_ID) {
      setError("Donation ID is missing.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const payload = {
        Donation_ID: donation.Donation_ID,

        NGO_ID: ngoId,

        Claim_Date: new Date().toISOString(),
      };

      console.log("Sending claim payload:", payload);

      const response = await createClaim(payload);

      console.log("Claim API response:", response);

      if (!response) {
        throw new Error("The server returned an empty response.");
      }

      const claim = response?.data || response?.claim || null;

      const claimId = claim?.Claim_ID || "Created successfully";

      onSuccess?.(`Donation claimed successfully! Claim ID: ${claimId}`);
    } catch (err) {
      console.error("Claim error:", err);

      setError(err.message || "Failed to claim donation.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!donation) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Claim Donation</h2>

            <p className="mt-1 text-sm text-gray-500">
              Claim this donation for your NGO.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={19} />
          </button>
        </div>

        {/* ==================================================
            DONATION INFO
        ================================================== */}

        <div className="px-6 pt-5">
          <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <p className="text-xs font-medium text-green-600">
                  Donation ID
                </p>

                <p className="font-bold text-gray-900">
                  {donation.Donation_ID}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Food</p>

                <p className="text-sm font-semibold text-gray-800">
                  {donation.Food_Category}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Quantity</p>

                <p className="text-sm font-semibold text-gray-800">
                  {donation.Quantity_KG} KG
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            NGO PROFILE
        ================================================== */}

        {ngoId ? (
          <div className="px-6 py-5">
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Claiming as
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
              <Building2 size={18} className="shrink-0 text-green-600" />

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {user?.name || "NGO User"}
                </p>

                <p className="text-xs text-gray-500">{ngoId}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-6 py-8 text-center">
            <AlertCircle size={32} className="mx-auto mb-3 text-orange-500" />

            <p className="font-semibold text-gray-900">
              NGO profile not linked
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Please complete your NGO Registration before claiming donations.
            </p>
          </div>
        )}

        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (
          <div className="mx-6 mb-4 flex gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <AlertCircle size={17} className="mt-0.5 shrink-0" />

            <span>{error}</span>
          </div>
        )}

        {/* ==================================================
            FOOTER
        ================================================== */}

        <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-200 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleClaim}
            disabled={!ngoId || submitting}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Claiming...
              </>
            ) : (
              "Confirm Claim"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimModal;
