import {
  FileText,
  Eye,
  Download,
  Trash2,
} from "lucide-react";

export default function ResumeCard({
  resume,
  onView,
  onDelete,
}) {
  const skills = Array.isArray(resume.skills)
    ? resume.skills
    : Object.values(resume.skills || {}).flat();

  // =====================================================
  // ATS SCORE COLOR
  // =====================================================

  const scoreColor = () => {
    if (resume.atsScore >= 90) {
      return `
        text-emerald-600
        bg-emerald-50
        border-emerald-200

        dark:text-emerald-400
        dark:bg-emerald-500/10
        dark:border-emerald-500/30
      `;
    }

    if (resume.atsScore >= 75) {
      return `
        text-amber-500
        bg-amber-50
        border-amber-200

        dark:text-amber-400
        dark:bg-amber-500/10
        dark:border-amber-500/30
      `;
    }

    return `
      text-red-500
      bg-red-50
      border-red-200

      dark:text-red-400
      dark:bg-red-500/10
      dark:border-red-500/30
    `;
  };

  // =====================================================
  // DOWNLOAD RESUME
  // =====================================================

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/resume/download/${resume._id}`,
        {
          method: "GET",

          // HTTP-only cookie
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error(
          "Download response:",
          errorText
        );

        throw new Error(
          `Download failed: ${response.status} ${response.statusText}`
        );
      }

      const blob = await response.blob();

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        resume.originalName || "resume.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
    } catch (error) {
      console.error(
        "Download Error:",
        error
      );

      alert(
        error.message ||
          "Failed to download resume"
      );
    }
  };

  return (
    <div
      className="
        rounded-3xl

        border
        border-slate-200

        bg-white

        p-6

        shadow-sm

        transition-all
        duration-300

        hover:shadow-md

        dark:border-slate-700
        dark:bg-slate-900
        dark:hover:border-slate-600
      "
    >
      {/* =================================================
          TOP
      ================================================= */}

      <div className="flex items-start justify-between gap-4">

        {/* FILE INFO */}

        <div className="flex min-w-0 items-start gap-3">

          {/* FILE ICON */}

          <div
            className="
              shrink-0
              rounded-xl

              bg-violet-100

              p-3

              dark:bg-violet-500/20
            "
          >
            <FileText
              className="
                text-violet-600

                dark:text-violet-400
              "
              size={24}
            />
          </div>

          {/* DETAILS */}

          <div className="min-w-0">
            <h2
              className="
                truncate
                text-lg
                font-bold
                text-slate-800

                dark:text-slate-900
              "
            >
              {resume.originalName}
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500

                dark:text-slate-500
              "
            >
              Uploaded{" "}
              {new Date(
                resume.createdAt
              ).toLocaleDateString()}
            </p>

            <p
              className="
                text-sm
                text-slate-400

                dark:text-slate-400
              "
            >
              {resume.fileSize
                ? `${(
                    resume.fileSize / 1024
                  ).toFixed(1)} KB`
                : "Unknown size"}
            </p>
          </div>
        </div>

        {/* =================================================
            ATS SCORE
        ================================================= */}

        <div
          className={`
            shrink-0
            rounded-2xl
            border
            px-4
            py-2
            text-center

            ${scoreColor()}
          `}
        >
          <p className="text-3xl font-black">
            {resume.atsScore ?? 0}
          </p>

          <p className="text-xs font-semibold">
            ATS Score
          </p>
        </div>
      </div>

      {/* =================================================
          SKILLS
      ================================================= */}

      <div className="mt-6 flex flex-wrap gap-2">

        {skills
          .slice(0, 5)
          .map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="
                rounded-full

                bg-violet-100

                px-3
                py-1

                text-xs
                font-medium
                text-violet-700

                dark:bg-violet-500/15
                dark:text-violet-400
              "
            >
              {skill}
            </span>
          ))}

        {skills.length > 5 && (
          <span
            className="
              rounded-full

              bg-slate-100

              px-3
              py-1

              text-xs
              font-medium
              text-slate-500

              dark:bg-slate-800
              dark:text-slate-400
            "
          >
            +{skills.length - 5} more
          </span>
        )}
      </div>

      {/* =================================================
          BOTTOM ACTIONS
      ================================================= */}

      <div
        className="
          mt-6
          flex
          items-center
          justify-between
          gap-3

          border-t
          border-slate-200

          pt-5

          dark:border-slate-700
        "
      >

        {/* VIEW */}

        <button
          type="button"
          onClick={() =>
            onView(resume._id)
          }
          className="
            flex
            cursor-pointer
            items-center
            gap-2

            rounded-xl

            border
            border-slate-200

            bg-white

            px-4
            py-2

            text-sm
            font-medium
            text-slate-700

            transition

            hover:bg-slate-100

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <Eye size={16} />

          View
        </button>

        {/* DOWNLOAD */}

        <button
          type="button"
          onClick={handleDownload}
          className="
            flex
            cursor-pointer
            items-center
            gap-2

            rounded-xl

            border
            border-slate-200

            bg-white

            px-4
            py-2

            text-sm
            font-medium
            text-slate-700

            transition

            hover:bg-slate-100

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <Download size={16} />

          Download
        </button>

        {/* DELETE */}

        <button
          type="button"
          onClick={() =>
            onDelete(resume._id)
          }
          className="
            flex
            cursor-pointer
            items-center
            gap-2

            rounded-xl

            border
            border-red-200

            bg-white

            px-4
            py-2

            text-sm
            font-medium
            text-red-500

            transition

            hover:bg-red-50

            dark:border-red-900/50
            dark:bg-slate-900
            dark:text-red-400
            dark:hover:bg-red-500/10
          "
        >
          <Trash2 size={16} />

          Delete
        </button>
      </div>
    </div>
  );
}