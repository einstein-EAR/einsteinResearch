export function CtaBand() {
  const actions = [
    { label: "Submit your paper", href: "/paper-submission", primary: true },
    { label: "Join as reviewer", href: "/join", primary: false },
    { label: "Thesis publishing", href: "/dissertation", primary: false },
    { label: "Secure payment", href: "/payment", primary: false },
  ];

  return (
    <section className="w-full border-y border-indigo-100 bg-white">
      <div className="mx-auto grid w-full gap-3 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {actions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            className={`flex items-center justify-center rounded-xl px-4 py-4 text-center text-sm font-semibold transition ${
              action.primary
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700"
                : "border border-slate-200 bg-slate-50 text-slate-800 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-800"
            }`}
          >
            {action.label}
          </a>
        ))}
      </div>
    </section>
  );
}
