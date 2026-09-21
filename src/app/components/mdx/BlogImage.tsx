import Image, { type StaticImageData } from "next/image";
import bigOImage from "../../../../public/images/posts/big-o/time-complexity.jpg";
import dipImage from "../../../../public/images/posts/dip/dip.webp";
import errorWrappingImage from "../../../../public/images/posts/error-handling/error-wrapping.webp";
import hyprlandImage from "../../../../public/images/posts/niri/hyprland-exemplo.webp";
import niriHeroImage from "../../../../public/images/posts/niri/niri-hero.webp";
import niriOverviewImage from "../../../../public/images/posts/niri/overview.webp";
import tcmallocImage from "../../../../public/images/posts/structs/tcmalloc_internals.webp";

const BLOG_IMAGES: Record<string, StaticImageData> = {
  "/images/posts/big-o/time-complexity.jpg": bigOImage,
  "/images/posts/dip/dip.webp": dipImage,
  "/images/posts/error-handling/error-wrapping.webp": errorWrappingImage,
  "/images/posts/niri/hyprland-exemplo.webp": hyprlandImage,
  "/images/posts/niri/niri-hero.webp": niriHeroImage,
  "/images/posts/niri/overview.webp": niriOverviewImage,
  "/images/posts/structs/tcmalloc_internals.webp": tcmallocImage,
};

type BlogImageProps = React.ComponentPropsWithoutRef<"img">;

export function BlogImage({ src, alt = "" }: BlogImageProps) {
  if (typeof src !== "string" || !BLOG_IMAGES[src]) {
    throw new Error(`Blog image is missing from BLOG_IMAGES: ${String(src)}`);
  }

  const image = BLOG_IMAGES[src];

  return (
    <Image
      src={image}
      alt={alt}
      sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 896px) calc(100vw - 3rem), 848px"
      placeholder={image.blurDataURL ? "blur" : "empty"}
    />
  );
}
