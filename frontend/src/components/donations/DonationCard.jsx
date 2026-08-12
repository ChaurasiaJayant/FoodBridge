import {
  MapPin,
  Weight,
  Clock,
  Utensils,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const statusStyles = {
  Available: "bg-green-100 text-green-700 border-green-200",

  Claimed: "bg-blue-100 text-blue-700 border-blue-200",

  "Picked Up": "bg-orange-100 text-orange-700 border-orange-200",

  Delivered: "bg-gray-100 text-gray-700 border-gray-200",

  Expired: "bg-red-100 text-red-700 border-red-200",
};

const foodIcons = {
  "Cooked Meals": "🍱",
  "Raw Vegetables": "🥕",
  Fruits: "🍎",
  Bakery: "🥐",
  Dairy: "🥛",
  Other: "🍽️",
};

const DonationCard = ({ donation, onClaim }) => {
  const expiryTime = new Date(donation.Expiry_Time);

  const now = new Date();

  const hoursLeft = (expiryTime - now) / (1000 * 60 * 60);

  const isHighPriority =
    donation.Status === "Available" && hoursLeft > 0 && hoursLeft <= 3;

  const formatExpiry = () => {
    if (hoursLeft <= 0) {
      return "Expired";
    }

    if (hoursLeft < 1) {
      return `${Math.ceil(hoursLeft * 60)} minutes left`;
    }

    return `${Math.ceil(hoursLeft)} hours left`;
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-200/40 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Priority */}
      {isHighPriority && (
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
          <AlertTriangle size={13} />
          HIGH PRIORITY
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
            {foodIcons[donation.Food_Category] || "🍽️"}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Donation ID
            </p>

            <h3 className="font-bold text-gray-900">{donation.Donation_ID}</h3>
          </div>
        </div>

        {!isHighPriority && (
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              statusStyles[donation.Status] || "bg-gray-100 text-gray-600"
            }`}
          >
            {donation.Status}
          </span>
        )}
      </div>

      {/* Priority status */}
      {isHighPriority && (
        <div className="mt-4">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              statusStyles[donation.Status]
            }`}
          >
            {donation.Status}
          </span>
        </div>
      )}

      {/* Food category */}
      <div className="mt-5">
        <p className="text-xs text-gray-400">Food Category</p>

        <p className="mt-1 font-semibold text-gray-800">
          {donation.Food_Category}
        </p>
      </div>

      {/* Information */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="flex items-center gap-2 text-gray-400">
            <Weight size={15} />
            <span className="text-xs">Quantity</span>
          </div>

          <p className="mt-1 font-semibold text-gray-800">
            {donation.Quantity_KG} KG
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock size={15} />
            <span className="text-xs">Expiry</span>
          </div>

          <p
            className={`mt-1 font-semibold ${
              isHighPriority
                ? "text-orange-600"
                : hoursLeft <= 0
                  ? "text-red-600"
                  : "text-gray-800"
            }`}
          >
            {formatExpiry()}
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="mt-4 flex items-start gap-2 text-sm text-gray-600">
        <MapPin size={17} className="mt-0.5 shrink-0 text-green-600" />

        <span>{donation.Location}</span>
      </div>

      {/* Claim */}
      {donation.Status === "Available" && (
        <button
          onClick={() => onClaim(donation)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white shadow-md shadow-green-100 transition hover:bg-green-700 hover:shadow-lg"
        >
          <CheckCircle2 size={18} />
          Claim Donation
        </button>
      )}

      {/* Claimed message */}
      {donation.Status === "Claimed" && (
        <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
          <CheckCircle2 size={17} />
          Donation Claimed
        </div>
      )}
    </div>
  );
};

export default DonationCard;
