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
      "hidden lg:flex flex-col w-72 glass border-r border-white/5 p-8 space-y-10 sticky top-20 h-[calc(100vh-80px)] shadow-2xl",
      className
    )}>
      <div className="space-y-2">
        {items.map((item, i) => (
          <NavLink
            key={i}
            to={item.href}
            className={({ isActive }) => cn(
              "w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group",
              isActive
                ? "bg-primary text-white shadow-xl shadow-primary/20 font-black"
                : "text-gray-500 hover:bg-white/5 hover:text-white"
            )}
          >
            <div className={cn(
              "transition-transform duration-300 group-hover:scale-110",
              "text-inherit"
            )}>
              {item.icon}
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em]">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};
