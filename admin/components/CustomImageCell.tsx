import { CellContainer } from "@keystone-6/core/admin-ui/components";
import type { CellComponent } from "@keystone-6/core/types";

export const Cell: CellComponent = ({ item }) => {
  const src = typeof item.preview === "string" ? item.preview : null;

  if (!src) return <CellContainer>No Image</CellContainer>;

  return (
    <CellContainer>
      <img
        src={src}
        alt="Preview"
        loading="lazy"
        decoding="async"
        width={40}
        height={40}
        className="h-10 w-10"
        style={{
          objectFit: "contain",
          borderRadius: "4px",
        }}
      />
    </CellContainer>
  );
};
