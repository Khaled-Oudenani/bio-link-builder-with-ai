"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Link as LinkType } from "@/types";
import { GripVertical, Trash2, Eye, EyeOff } from "lucide-react";

interface Props {
  link: LinkType;
  onUpdate: (id: string, updates: Partial<LinkType>) => void;
  onDelete: (id: string) => void;
}

export default function SortableLinkCard({ link, onUpdate, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 rounded-xl border group transition-all"
      {...attributes}
    >
      <button
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 rounded"
        style={{ color: "var(--color-muted)" }}
      >
        <GripVertical size={15} />
      </button>

      <div className="flex-1 min-w-0 space-y-1.5">
        <input
          value={link.title}
          onChange={(e) => onUpdate(link.id, { title: e.target.value })}
          placeholder="Link title"
          className="w-full bg-transparent text-sm font-medium outline-none"
          style={{ color: "var(--color-text)" }}
        />
        <input
          value={link.url}
          onChange={(e) => onUpdate(link.id, { url: e.target.value })}
          placeholder="https://..."
          className="w-full bg-transparent text-xs outline-none font-mono"
          style={{ color: "var(--color-muted)" }}
        />
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onUpdate(link.id, { is_active: !link.is_active })}
          className="p-1.5 rounded-lg transition-all hover:bg-white/5"
          style={{ color: link.is_active ? "var(--color-accent)" : "var(--color-muted)" }}
          title={link.is_active ? "Hide link" : "Show link"}
        >
          {link.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
        </button>
        <button
          onClick={() => onDelete(link.id)}
          className="p-1.5 rounded-lg transition-all hover:bg-red-500/10"
          style={{ color: "var(--color-muted)" }}
          title="Delete link"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
