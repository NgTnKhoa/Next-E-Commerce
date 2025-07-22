import { Category } from "@/models/category.model";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="category-card relative rounded-lg overflow-hidden bg-secondary group">
        <AspectRatio ratio={4 / 3}>
          <Image
            className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105"
            src={category.image}
            alt={category.name}
            fill
          />
        </AspectRatio>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <div className="text-white">
            <h3 className="font-semibold text-lg">{category.name}</h3>
            <p className="text-sm text-white/80 mt-1">{category.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
