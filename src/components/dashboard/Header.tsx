"use client";

import { useState } from "react";
import { Bell, Search, User, ChevronDown, Sparkles, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-white/10 bg-black/20 px-6">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search players, clubs, leagues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full h-10 pl-10 pr-4 rounded-xl",
              "bg-white/5 border border-white/10",
              "text-sm text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50",
              "transition-all duration-200"
            )}
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/20 bg-white/5 px-1.5 text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* AI Assistant */}
        <button
          className={cn(
            "flex items-center gap-2 h-10 px-4 rounded-xl",
            "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
            "border border-purple-500/30 hover:border-purple-500/50",
            "text-sm font-medium text-purple-300",
            "transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10"
          )}
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>

        {/* Notifications */}
        <button
          className={cn(
            "relative flex items-center justify-center h-10 w-10 rounded-xl",
            "bg-white/5 border border-white/10 hover:bg-white/10",
            "text-muted-foreground hover:text-foreground",
            "transition-all duration-200"
          )}
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User Menu */}
        <button
          className={cn(
            "flex items-center gap-3 h-10 pl-2 pr-3 rounded-xl",
            "bg-white/5 border border-white/10 hover:bg-white/10",
            "transition-all duration-200"
          )}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600">
            <User className="h-4 w-4 text-black" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium">Ashar</p>
            <p className="text-[10px] text-muted-foreground">Analyst Mode</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
