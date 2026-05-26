import Image from "next/image";
import { cn } from "@/lib/cn";

type HeroImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
};

export default function HeroImage({
  src,
  alt,
  priority,
  className,
  imageClassName,
  sizes = "(max-width: 1024px) 100vw, 520px",
}: HeroImageProps) {
  return (
    <div className={cn("relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-[520px]", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/10 ring-1 ring-white/60">
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover object-center", imageClassName)}
          priority={priority}
          sizes={sizes}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
      </div>
    </div>
  );
}
