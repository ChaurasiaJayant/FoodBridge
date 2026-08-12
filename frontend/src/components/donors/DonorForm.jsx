import { useState } from "react";
import {
  UserPlus,
  Loader2,
  User,
  Building2,
  MapPin,
  Phone,
  Navigation,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";

import { createDonor, getMe } from "../../services/api.js";

import MapPicker from "../common/MapPicker.jsx";

const initialForm = {
  Donor_Name: "",
  Donor_Type: "",
  City: "",
  Location: "",
  Contact: "",
};

const donorTypes = ["Restaurant", "Hotel", "Event", "Individual", "Other"];

const DonorForm = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState(initialForm);

  const [loading, setLoading] = useState(false);

  const { updateUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleLocationSelect = (result) => {
    setFormData((previous) => ({
      ...previous,
      Location: result.address,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Donor_Name.trim()) {
      onError("Please enter the donor name.");
      return;
    }

    if (!formData.Donor_Type) {
      onError("Please select a donor type.");
      return;
    }

    if (!formData.City.trim()) {
      onError("Please enter the city.");
      return;
    }

    if (!formData.Location.trim()) {
      onError("Please select the location on the map.");
      return;
    }

    if (!formData.Contact.trim()) {
      onError("Please enter the contact number.");
      return;
    }

    if (formData.Contact.length !== 10) {
      onError("Contact number must be exactly 10 digits.");
      return;
    }

    try {
      setLoading(true);

      const data = await createDonor(formData);

      const donor = data.data || data.donor || data;

      const donorId =
        donor?.Donor_ID || data.Donor_ID || "Generated successfully";

      const meResponse = await getMe();

      const updatedUser = meResponse.user || meResponse.data || meResponse;

      updateUser(updatedUser);

      setFormData(initialForm);

      onSuccess(`Donor registered successfully! Your ID: ${donorId}`);
    } catch (error) {
      console.error("Donor registration error:", error);

      onError(
        error.message || "Something went wrong while registering the donor.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Donor Name */}
        <div className="sm:col-span-2">
          <label
            htmlFor="Donor_Name"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Donor Name
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="Donor_Name"
              name="Donor_Name"
              type="text"
              value={formData.Donor_Name}
              onChange={handleChange}
              placeholder="Enter restaurant, hotel, event or donor name"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-400 focus:bg-white focus:ring-4 focus:ring-green-500/10"
            />
          </div>
        </div>

        {/* Donor Type */}
        <div>
          <label
            htmlFor="Donor_Type"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Donor Type
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="relative">
            <Building2
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              id="Donor_Type"
              name="Donor_Type"
              value={formData.Donor_Type}
              onChange={handleChange}
              className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-green-400 focus:bg-white focus:ring-4 focus:ring-green-500/10"
            >
              <option value="">Select donor type</option>

              {donorTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="City"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            City
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="City"
              name="City"
              type="text"
              value={formData.City}
              onChange={handleChange}
              placeholder="e.g. Noida"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-400 focus:bg-white focus:ring-4 focus:ring-green-500/10"
            />
          </div>
        </div>

        {/* Location */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Location
            <span className="ml-1 text-red-500">*</span>
          </label>

          <MapPicker onLocationSelect={handleLocationSelect} />

          {formData.Location && (
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <Navigation size={14} className="shrink-0 text-green-500" />

              {formData.Location}
            </div>
          )}
        </div>

        {/* Contact */}
        <div>
          <label
            htmlFor="Contact"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Contact
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="relative">
            <Phone
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="Contact"
              name="Contact"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={formData.Contact}
              onChange={handleChange}
              placeholder="Enter 10 digit contact number"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-400 focus:bg-white focus:ring-4 focus:ring-green-500/10"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-7 flex justify-end border-t border-slate-100 pt-6">
        <button
          type="submit"
          disabled={loading}
          className="group flex h-12 min-w-[170px] items-center justify-center gap-2 rounded-xl bg-green-500 px-6 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-green-500/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Registering...
            </>
          ) : (
            <>
              <UserPlus size={18} />
              Register Donor
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default DonorForm;
