import Image from "next/image";

export function Render({ name, alt, priority = false }: {
  name: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="exhibit-render">
      <Image
        src={`/artwork/cutouts/${name}.webp`}
        alt={alt}
        fill
        unoptimized
        preload={priority}
      />
    </div>
  );
}
