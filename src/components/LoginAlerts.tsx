import { CircleAlertIcon, CheckCircle2 } from "lucide-react";

interface LoginAlertProps {
  type: "error" | "success";
  message: string;
  details?: string[];
}

const LoginAlerts = ({ type, message, details }: LoginAlertProps) => {
  return (
    <div
      className={`rounded-md border px-4 py-3 mb-2 w-90 mt-6
        ${type === "error"
          ? "border-red-300 bg-red-50 dark:bg-black dark:border-red-700"
          : "border-green-300 bg-green-50 dark:bg-black dark:border-green-700"}
        dark:text-white
      `}
    >
      <div className="flex gap-3">
        {type === "error" ? (
          <CircleAlertIcon
            className="mt-0.5 shrink-0 text-red-500 opacity-60"
            size={16}
            aria-hidden="true"
          />
        ) : (
          <CheckCircle2
            className="mt-0.5 shrink-0 text-green-500 opacity-60"
            size={16}
            aria-hidden="true"
          />
        )}
        <div className="grow space-y-1 text-left">
          <p className="text-sm font-medium">{message}</p>
          {details && (
            <ul className="text-muted-foreground list-inside list-disc text-sm dark:text-white">
              {details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export { LoginAlerts };