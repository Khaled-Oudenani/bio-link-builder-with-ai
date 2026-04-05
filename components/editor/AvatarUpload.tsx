// "use client";

// import { useState, useRef } from "react";
// import { createClient } from "@/lib/supabase/client";
// import { Upload, Loader2, X } from "lucide-react";
// import Image from "next/image";

// interface Props {
//   currentUrl: string;
//   onUploaded: (url: string) => void;
// }

// export default function AvatarUpload({ currentUrl, onUploaded }: Props) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);

//   async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // التحقق من النوع والحجم
//     if (!file.type.startsWith("image/")) {
//       setError("Please upload an image file");
//       return;
//     }
//     if (file.size > 2 * 1024 * 1024) {
//       setError("Image must be under 2MB");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     const supabase = createClient();
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();
//     if (!user) return;

//     const ext = file.name.split(".").pop();
//     const fileName = `${user.id}-${Date.now()}.${ext}`;

//     const { error: uploadError } = await supabase.storage
//       .from("avatars")
//       .upload(fileName, file, { upsert: true });

//     if (uploadError) {
//       setError("Upload failed. Try again.");
//       setLoading(false);
//       return;
//     }

//     const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
//     onUploaded(data.publicUrl);
//     setLoading(false);
//   }

//   return (
//     <div className="space-y-2">
//       <label
//         className="block text-xs font-semibold uppercase tracking-widest mb-2"
//         style={{ color: "var(--color-muted)" }}
//       >
//         Avatar
//       </label>

//       <div className="flex items-center gap-4">
//         {/* Preview */}
//         <div
//           className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0 border"
//           style={{
//             background: "var(--color-surface-2)",
//             borderColor: "var(--color-border)",
//           }}
//         >
//           {currentUrl ? (
//             <Image
//               src={currentUrl}
//               alt="Avatar"
//               width={64}
//               height={64}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <Upload size={20} style={{ color: "var(--color-muted)" }} />
//           )}
//         </div>

//         {/* Upload button */}
//         <div className="flex-1 space-y-2">
//           <input
//             ref={inputRef}
//             type="file"
//             accept="image/*"
//             onChange={handleFile}
//             className="hidden"
//           />
//           <button
//             onClick={() => inputRef.current?.click()}
//             disabled={loading}
//             className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all hover:bg-white/5 disabled:opacity-50"
//             style={{
//               borderColor: "var(--color-border)",
//               color: "var(--color-text)",
//             }}
//           >
//             {loading ? (
//               <Loader2 size={13} className="animate-spin" />
//             ) : (
//               <Upload size={13} />
//             )}
//             {loading ? "Uploading..." : "Upload Image"}
//           </button>

//           {currentUrl && (
//             <button
//               onClick={() => onUploaded("")}
//               className="flex items-center gap-1.5 text-xs transition-all hover:opacity-80"
//               style={{ color: "#f76a8f" }}
//             >
//               <X size={12} /> Remove photo
//             </button>
//           )}

//           <p className="text-xs" style={{ color: "var(--color-muted)" }}>
//             JPG, PNG, WebP — max 2MB
//           </p>
//         </div>
//       </div>

//       {error && (
//         <p className="text-xs" style={{ color: "#f76a8f" }}>
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, Loader2, X } from "lucide-react";
import Image from "next/image";

interface Props {
  currentUrl: string;
  onUploaded: (url: string) => void;
}

export default function AvatarUpload({ currentUrl, onUploaded }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be under 2MB");
      return;
    }

    setLoading(true);
    setError("");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // إذا عنده صورة قديمة احذفها أولاً
    if (currentUrl) {
      const oldFileName = currentUrl.split("/avatars/")[1];
      if (oldFileName) {
        await supabase.storage.from("avatars").remove([oldFileName]);
      }
    }

    const ext = file.name.split(".").pop();
    const fileName = `${user.id}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      setError("Upload failed. Try again.");
      setLoading(false);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
    onUploaded(data.publicUrl);
    setLoading(false);
  }

  async function handleRemove() {
    if (!currentUrl) return;

    const supabase = createClient();
    const fileName = currentUrl.split("/avatars/")[1];

    if (fileName) {
      await supabase.storage.from("avatars").remove([fileName]);
    }

    onUploaded("");
  }

  return (
    <div className="space-y-2">
      <label
        className="block text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: "var(--color-muted)" }}
      >
        Avatar
      </label>

      <div className="flex items-center gap-4">
        {/* Preview */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0 border"
          style={{
            background: "var(--color-surface-2)",
            borderColor: "var(--color-border)",
          }}
        >
          {currentUrl ? (
            <Image
              src={currentUrl}
              alt="Avatar"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <Upload size={20} style={{ color: "var(--color-muted)" }} />
          )}
        </div>

        {/* Upload button */}
        <div className="flex-1 space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          <button
            onClick={() => inputRef.current?.click()}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all hover:bg-white/5 disabled:opacity-50"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          >
            {loading ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Upload size={13} />
            )}
            {loading ? "Uploading..." : "Upload Image"}
          </button>

          {currentUrl && (
            <button
              onClick={handleRemove}
              className="flex items-center gap-1.5 text-xs transition-all hover:opacity-80"
              style={{ color: "#f76a8f" }}
            >
              <X size={12} /> Remove photo
            </button>
          )}

          <p className="text-xs" style={{ color: "var(--color-muted)" }}>
            JPG, PNG, WebP — max 2MB
          </p>
        </div>
      </div>

      {error && (
        <p className="text-xs" style={{ color: "#f76a8f" }}>
          {error}
        </p>
      )}
    </div>
  );
}
