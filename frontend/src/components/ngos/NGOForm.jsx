import { useState } from "react";

import {
  Loader2,
  Building2,
  MapPin,
  Phone,
  Users,
  Navigation,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";

import { createNGO, getMe } from "../../services/api.js";

import MapPicker from "../common/MapPicker.jsx";

const initialForm = {
  NGO_Name: "",
  City: "",
  Location: "",
  Capacity: "",
  Service_Area: "",
  Contact: "",
};

const NGOForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState(initialForm);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const { user, updateUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleLocationSelect = (result) => {
    setFormData((previous) => ({
      ...previous,
      Location: result.address,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.NGO_Name.trim()) {
      setError("Please enter NGO name.");
      return;
    }

    if (!formData.City.trim()) {
      setError("Please enter the city.");
      return;
    }

    if (!formData.Location.trim()) {
      setError("Please select a location on the map.");
      return;
    }

    if (!formData.Capacity || Number(formData.Capacity) <= 0) {
      setError("Please enter a valid capacity.");
      return;
    }

    if (!formData.Service_Area.trim()) {
      setError("Please enter the service area.");
      return;
    }

    if (!formData.Contact.trim()) {
      setError("Please enter the contact number.");
      return;
    }

    if (formData.Contact.length !== 10) {
      setError("Contact number must be exactly 10 digits.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // ==================================================
      // CREATE NGO
      // ==================================================

      const response = await createNGO({
        NGO_Name: formData.NGO_Name.trim(),

        City: formData.City.trim(),

        Location: formData.Location.trim(),

        Capacity: Number(formData.Capacity),

        Service_Area: formData.Service_Area.trim(),

        Contact: formData.Contact.trim(),
      });

      if (!response?.success) {
        throw new Error(response?.message || "Failed to register NGO.");
      }

      const ngo = response?.data || response?.ngo || response;

      const ngoId = ngo?.NGO_ID;

      if (!ngoId) {
        throw new Error("NGO was created but NGO_ID was not returned.");
      }

      updateUser({
        ...user,
        profileId: ngoId,
      });

      if (!ngoId) {
        throw new Error(
          "NGO was created but NGO_ID was not returned by the server.",
        );
      }

      // ==================================================
      // IMMEDIATELY UPDATE AUTH CONTEXT
      // ==================================================

      const updatedUser = {
        ...user,
        profileId: ngoId,
      };

      updateUser(updatedUser);

      // ==================================================
      // CONFIRM WITH SERVER
      // ==================================================

      try {
        const meData = await getMe();

        if (meData?.user) {
          updateUser(meData.user);
        }
      } catch (refreshError) {
        console.error("Failed to refresh user:", refreshError.message);

        // Keep the locally updated profileId.
        // The backend already saved it.
      }

      // ==================================================
      // SUCCESS
      // ==================================================

      onSuccess?.(`NGO registered successfully! Your ID: ${ngoId}`);

      // ==================================================
      // RESET
      // ==================================================

      setFormData(initialForm);
    } catch (err) {
      console.error("NGO registration error:", err);

      setError(err.message || "Something went wrong while registering NGO.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* NGO NAME */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            NGO Name
          </label>

          <div className="relative">
            <Building2
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              name="NGO_Name"
              value={formData.NGO_Name}
              onChange={handleChange}
              placeholder="Enter NGO name"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
            />
          </div>
        </div>

        {/* CITY */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            City
          </label>

          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              name="City"
              value={formData.City}
              onChange={handleChange}
              placeholder="e.g. Noida"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
            />
          </div>
        </div>

        {/* LOCATION */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Location
          </label>

          <MapPicker onLocationSelect={handleLocationSelect} />

          {formData.Location && (
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <Navigation size={14} className="shrink-0 text-green-500" />

              {formData.Location}
            </div>
          )}
        </div>

        {/* CAPACITY */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Capacity (KG)
          </label>

          <div className="relative">
            <Users
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="number"
              name="Capacity"
              min="0"
              value={formData.Capacity}
              onChange={handleChange}
              placeholder="e.g. 500"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
            />
          </div>
        </div>

        {/* SERVICE AREA */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Service Area
          </label>

          <input
            type="text"
            name="Service_Area"
            value={formData.Service_Area}
            onChange={handleChange}
            placeholder="e.g. Noida, Greater Noida"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
          />
        </div>

        {/* CONTACT */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Contact
          </label>

          <div className="relative">
            <Phone
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="tel"
              name="Contact"
              inputMode="numeric"
              maxLength={10}
              value={formData.Contact}
              onChange={handleChange}
              placeholder="Enter 10 digit contact number"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-200 transition hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Registering...
          </>
        ) : (
          <>
            <Building2 size={20} />
            Register NGO
          </>
        )}
      </button>
    </form>
  );
};

export default NGOForm;
