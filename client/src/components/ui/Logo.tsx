import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  showText?: boolean;
}

export function Logo({ className, variant = "dark", showText = true }: LogoProps) {
  const textColorClass = variant === "light" ? "text-white" : "text-gray-900";
  const primaryColor = variant === "light" ? "#2a1570" : "#3a1d96";
  const accentColor = "#ff3371";
  const cPathColor = variant === "light" ? "#ffffff" : "#ffffff";
  const bgColor = variant === "light" ? "rgba(255,255,255,0.1)" : "transparent";
  
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative h-12 w-12 md:h-14 md:w-14", variant === "light" ? "bg-opacity-20 rounded-lg" : "")}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 64 64" 
          className="h-full w-full"
          style={{ filter: variant === "light" ? "drop-shadow(0 0 4px rgba(255,255,255,0.3))" : "none" }}
        >
          {/* Abstract circuit board background */}
          <rect width="64" height="64" rx="8" fill={primaryColor} />
          
          {/* Digital circuit lines */}
          <path d="M10 20 H30 V40 H50" stroke={accentColor} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M15 50 H40 V30 H54" stroke={accentColor} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M35 15 V35 H55" stroke={accentColor} strokeWidth="2" fill="none" strokeLinecap="round" />
          
          {/* Connection points/nodes */}
          <circle cx="30" cy="20" r="3" fill={accentColor} />
          <circle cx="30" cy="40" r="3" fill={accentColor} />
          <circle cx="50" cy="40" r="3" fill={accentColor} />
          <circle cx="15" cy="50" r="3" fill={accentColor} />
          <circle cx="40" cy="50" r="3" fill={accentColor} />
          <circle cx="40" cy="30" r="3" fill={accentColor} />
          <circle cx="54" cy="30" r="3" fill={accentColor} />
          <circle cx="35" cy="15" r="3" fill={accentColor} />
          <circle cx="35" cy="35" r="3" fill={accentColor} />
          <circle cx="55" cy="35" r="3" fill={accentColor} />
          
          {/* 'C' letter shape overlay */}
          <path 
            d="M32 12c-11.05 0-20 8.95-20 20s8.95 20 20 20c8.84 0 16.34-5.73 19-13.7" 
            stroke={cPathColor} 
            strokeWidth="5" 
            fill="none" 
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={cn("text-xl md:text-2xl font-bold leading-none tracking-tight", textColorClass)}>
            Cyber <span className="text-[#ff3371]">Digital</span>
          </span>
          <span className={cn("text-sm md:text-base font-medium", variant === "light" ? "text-gray-300" : "text-gray-700")}>
            Marketing
          </span>
        </div>
      )}
    </div>
  );
}