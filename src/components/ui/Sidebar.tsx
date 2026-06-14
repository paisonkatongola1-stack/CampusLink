import React from 'react';
import { NavLink } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarProps {
  items: SidebarItem[];
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ items, className }) => {
  return (
    <aside className={cn(
      "hidden lg:flex flex-col w-64 glass border-r border-white/5 p-6 space-y-8 sticky top-20 h-[calc(100vh-80px)]",
      className
    )}>
      <div className="space-y-1">
        {items.map((item, i) => (
          <NavLink
            key={i}
            to={item.href}
            className={({ isActive }) => cn(
              "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all",
              isActive
                ? "bg-primary text-white shadow-lg shadow-primary/20 font-bold"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};
