import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  HeartHandshake,
  MapPin,
  Menu,
  PackageOpen,
  ShieldCheck,
  Truck,
  UsersRound,
  X,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* ==================================================
          NAVBAR
      ================================================== */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a1628]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-400/15 text-green-400 ring-1 ring-green-400/20">
              <PackageOpen size={21} />
            </div>

            <span className="text-xl font-bold tracking-tight">FoodBridge</span>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            <button
              type="button"
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm text-white/60 transition hover:text-white"
            >
              How it works
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("for-donors")}
              className="text-sm text-white/60 transition hover:text-white"
            >
              For donors
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("for-ngos")}
              className="text-sm text-white/60 transition hover:text-white"
            >
              For NGOs
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("impact")}
              className="text-sm text-white/60 transition hover:text-white"
            >
              Impact
            </button>
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => navigate("/login/donor")}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/5 hover:text-white"
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={() => navigate("/register/donor")}
              className="rounded-xl bg-green-400 px-4 py-2.5 text-sm font-bold text-[#0a1628] transition hover:bg-green-300"
            >
              Get started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((previous) => !previous)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#0a1628] px-5 py-5 md:hidden">
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => scrollToSection("how-it-works")}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm text-white/70 hover:bg-white/5 hover:text-white"
              >
                How it works
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("for-donors")}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm text-white/70 hover:bg-white/5 hover:text-white"
              >
                For donors
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("for-ngos")}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm text-white/70 hover:bg-white/5 hover:text-white"
              >
                For NGOs
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("impact")}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm text-white/70 hover:bg-white/5 hover:text-white"
              >
                Impact
              </button>

              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/login/donor")}
                  className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white"
                >
                  Sign in
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/register/donor")}
                  className="rounded-xl bg-green-400 px-4 py-3 text-sm font-bold text-[#0a1628]"
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ==================================================
          HERO
      ================================================== */}

      <main>
        <section className="relative overflow-hidden">
          {/* Green radial glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-[-180px] h-[620px] w-[620px] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(74,222,128,0.24) 0%, rgba(74,222,128,0.08) 34%, rgba(10,22,40,0) 72%)",
              animation: "pulse 4s ease-in-out infinite",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 sm:pt-28 lg:pb-28 lg:pt-32">
            <div className="mx-auto max-w-4xl text-center">
              {/* Badge */}
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-sm font-medium text-green-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                </span>
                Making a difference, one meal at a time
              </div>

              {/* Heading */}
              <h1 className="mt-8 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Rescue food.{" "}
                <span className="text-green-400">Feed communities.</span>
              </h1>

              {/* Subtext */}
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                FoodBridge connects surplus food from donors with NGOs that can
                get it to communities who need it most. Together, we turn food
                waste into meaningful impact.
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate("/register/donor")}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-green-400 px-6 py-3.5 text-sm font-bold text-[#0a1628] transition hover:bg-green-300 sm:w-auto"
                >
                  <HeartHandshake size={18} />
                  Donate food
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/register/ngo")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                >
                  <Building2 size={18} />
                  I'm an NGO
                </button>
              </div>
            </div>

            {/* Stats */}
            <div
              id="impact"
              className="mx-auto mt-20 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3">
                <div className="px-6 py-7 text-center">
                  <p className="text-3xl font-black text-green-400">2,400+</p>

                  <p className="mt-2 text-sm text-white/50">Meals rescued</p>
                </div>

                <div className="border-y border-white/10 px-6 py-7 text-center sm:border-x sm:border-y-0">
                  <p className="text-3xl font-black text-green-400">180+</p>

                  <p className="mt-2 text-sm text-white/50">Active donors</p>
                </div>

                <div className="px-6 py-7 text-center">
                  <p className="text-3xl font-black text-green-400">45+</p>

                  <p className="mt-2 text-sm text-white/50">NGO partners</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            WHO WE SERVE
        ================================================== */}

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">
              Who we serve
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              One network. Three ways to make an impact.
            </h2>

            <p className="mt-4 text-white/50">
              FoodBridge gives every participant a simple way to contribute to a
              more connected food rescue system.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {/* Donor */}
            <div
              id="for-donors"
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-green-400/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-400/10 text-green-400">
                <HeartHandshake size={23} />
              </div>

              <h3 className="mt-6 text-xl font-bold">Donors</h3>

              <p className="mt-3 text-sm leading-6 text-white/50">
                Restaurants, hotels, events, and individuals can list surplus
                food before it becomes waste.
              </p>

              <button
                type="button"
                onClick={() => navigate("/register/donor")}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-green-400 transition hover:text-green-300"
              >
                Register as donor
                <ChevronRight size={16} />
              </button>
            </div>

            {/* NGO */}
            <div
              id="for-ngos"
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-blue-400/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
                <Building2 size={23} />
              </div>

              <h3 className="mt-6 text-xl font-bold">NGOs</h3>

              <p className="mt-3 text-sm leading-6 text-white/50">
                Discover available donations, claim what your organization
                needs, and coordinate pickup and delivery.
              </p>

              <button
                type="button"
                onClick={() => navigate("/register/ngo")}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
              >
                Join as NGO
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Admin */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-amber-400/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                <ShieldCheck size={23} />
              </div>

              <h3 className="mt-6 text-xl font-bold">Administrators</h3>

              <p className="mt-3 text-sm leading-6 text-white/50">
                Manage donors, donations, NGOs, claims, and data-driven insights
                across the FoodBridge network.
              </p>

              <button
                type="button"
                onClick={() => navigate("/login/admin")}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-400 transition hover:text-amber-300"
              >
                Admin portal
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* ==================================================
            HOW IT WORKS
        ================================================== */}

        <section
          id="how-it-works"
          className="border-y border-white/10 bg-white/[0.02]"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">
                How it works
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                From surplus to serving communities.
              </h2>
            </div>

            <div className="mt-12">
              {[
                {
                  number: "01",
                  icon: PackageOpen,
                  title: "List food",
                  description:
                    "Donors add surplus food, quantity, location, and pickup information.",
                },
                {
                  number: "02",
                  icon: CheckCircle2,
                  title: "NGO claims",
                  description:
                    "NGOs browse available donations and claim food that matches their needs.",
                },
                {
                  number: "03",
                  icon: Clock3,
                  title: "Pickup coordinated",
                  description:
                    "The NGO coordinates collection and updates the claim as it moves forward.",
                },
                {
                  number: "04",
                  icon: Truck,
                  title: "Delivered",
                  description:
                    "Food reaches the community, turning a surplus donation into real impact.",
                },
              ].map(({ number, icon: Icon, title, description }) => (
                <div
                  key={number}
                  className="flex flex-col gap-5 border-b border-white/10 py-7 last:border-b-0 sm:flex-row sm:items-center sm:gap-7"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-green-400/20 bg-green-400/10 font-bold text-green-400">
                    {number}
                  </div>

                  <div className="flex flex-1 items-start gap-4">
                    <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/50 sm:flex">
                      <Icon size={19} />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold">{title}</h3>

                      <p className="mt-1 max-w-2xl text-sm leading-6 text-white/50">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            BOTTOM CTA
        ================================================== */}

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-7 sm:p-10 lg:p-12">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">
                Join FoodBridge
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                There is always a better place for surplus food.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                Whether you are donating food, serving communities, or managing
                the network, FoodBridge gives you the tools to make every meal
                count.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => navigate("/register/donor")}
                className="flex items-center justify-center gap-2 rounded-xl bg-green-400 px-5 py-3.5 text-sm font-bold text-[#0a1628] transition hover:bg-green-300"
              >
                <HeartHandshake size={18} />I want to donate food
              </button>

              <button
                type="button"
                onClick={() => navigate("/register/ngo")}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Building2 size={18} />
                My NGO wants to claim food
              </button>

              <button
                type="button"
                onClick={() => navigate("/login/admin")}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <ShieldCheck size={18} />
                Admin sign in
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-400/10 text-green-400">
              <PackageOpen size={19} />
            </div>

            <div>
              <p className="font-bold">FoodBridge</p>

              <p className="text-xs text-white/40">
                Reducing waste, feeding hope.
              </p>
            </div>
          </div>

          <p className="text-xs text-white/30">
            Connecting surplus food with communities that need it.
          </p>
        </div>
      </footer>

      {/* Minimal animation definition */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: translateX(-50%) scale(1);
            opacity: 0.55;
          }
          50% {
            transform: translateX(-50%) scale(1.08);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default Landing;
