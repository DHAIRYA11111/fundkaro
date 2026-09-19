import Link from "next/link";
import { categories } from "@/data/mock-campaigns";
import { 
  Cpu, Globe, Brain, Leaf, ShoppingBag, 
  UtensilsCrossed, Heart, GraduationCap, Gamepad2, Palette,
  LucideIcon
} from 'lucide-react';
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Cpu, Globe, Brain, Leaf, ShoppingBag, 
  UtensilsCrossed, Heart, GraduationCap, Gamepad2, Palette
};

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Explore Categories</h2>
          <p className="text-slate-600 text-lg">Find projects that match your interests.</p>
        </div>

        <div className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Globe;
            
            return (
              <Link
                key={category.id}
                href={`/explore?category=${category.id}`}
                className="min-w-[140px] md:min-w-[180px] shrink-0 snap-start group relative overflow-hidden rounded-2xl p-6 h-40 flex flex-col items-center justify-center text-center border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div 
                  className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-300 z-0" 
                  style={{ backgroundColor: category.color }}
                />
                
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div 
                    className={cn("p-3 rounded-xl transition-transform duration-300 group-hover:scale-110")}
                    style={{ backgroundColor: `${category.color}15`, color: category.color }}
                  >
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 leading-tight mb-1">{category.label}</h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
