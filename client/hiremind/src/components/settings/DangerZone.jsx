import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../services/authService";
import { deleteAccount } from "../../services/userService";

const DangerZone = () => {
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [deleting, setDeleting] = useState(false);

  // =========================
  // DELETE ACCOUNT
  // =========================

  const handleDeleteAccount = async () => {
    try {
      setDeleting(true);

      const data = await deleteAccount();

      if (data.success) {
        // Clear any old authentication data
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        localStorage.removeItem("user");

        setShowDeleteModal(false);

        alert(
          "Your account has been deleted successfully."
        );

        navigate("/login", {
          replace: true,
        });
      }
    } catch (error) {
      console.error(
        "Delete account error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to delete account"
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* =========================
          DANGER ZONE
      ========================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          rounded-3xl
          border
          border-red-200
          bg-red-50
          p-8
          shadow-sm

          dark:border-red-900/60
          dark:bg-red-950/20
        "
      >

        {/* Header */}

        <div className="flex items-center gap-3">

          <div
            className="
              rounded-xl
              bg-red-100
              p-3
              text-red-600

              dark:bg-red-500/15
              dark:text-red-400
            "
          >
            <AlertTriangle size={24} />
          </div>

          <div>

            <h2
              className="
                text-2xl
                font-bold
                text-red-700

                dark:text-red-400
              "
            >
              Danger Zone
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-red-600

                dark:text-red-400/80
              "
            >
              Actions here can affect your account
              permanently.
            </p>

          </div>
        </div>

        {/* =========================
            DELETE ACCOUNT CARD
        ========================= */}

        <div
          className="
            mt-6
            rounded-2xl
            border
            border-red-300
            bg-white
            p-6

            dark:border-red-900/70
            dark:bg-slate-900
          "
        >

          <div className="flex items-start gap-3">

            <Trash2
              size={22}
              className="
                mt-1
                shrink-0
                text-red-600

                dark:text-red-400
              "
            />

            <div>

              <h3
                className="
                  text-lg
                  font-semibold
                  text-red-700

                  dark:text-red-400
                "
              >
                Delete Account
              </h3>

              <p
                className="
                  mt-2
                  text-slate-600

                  dark:text-slate-300
                "
              >
                Permanently delete your HireMind
                account, profile, preferences, and all
                uploaded resumes. This action cannot be
                undone.
              </p>

            </div>
          </div>

          {/* Delete Button */}

          <button
            type="button"
            onClick={() =>
              setShowDeleteModal(true)
            }
            className="
              mt-6
              flex
              cursor-pointer
              items-center
              gap-2
              rounded-xl
              border
              border-red-600
              px-6
              py-3
              font-medium
              text-red-600
              transition

              hover:bg-red-600
              hover:text-white

              dark:border-red-500
              dark:text-red-400
              dark:hover:bg-red-600
              dark:hover:text-white
            "
          >
            <Trash2 size={18} />
            Delete Account
          </button>

        </div>
      </motion.div>

      {/* =========================
          DELETE CONFIRMATION MODAL
      ========================= */}

      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/70
              px-4
              backdrop-blur-sm
            "
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                relative
                w-full
                max-w-md
                rounded-3xl
                border
                border-red-500/20
                bg-white
                p-7
                shadow-2xl

                dark:border-red-500/20
                dark:bg-slate-900
              "
            >

              {/* Close */}

              <button
                type="button"
                onClick={() =>
                  setShowDeleteModal(false)
                }
                disabled={deleting}
                className="
                  absolute
                  right-5
                  top-5
                  cursor-pointer
                  rounded-lg
                  p-2
                  text-slate-500
                  transition

                  hover:bg-slate-100
                  hover:text-slate-800

                  dark:text-slate-400
                  dark:hover:bg-slate-800
                  dark:hover:text-white

                  disabled:cursor-not-allowed
                "
              >
                <X size={20} />
              </button>

              {/* Icon */}

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-red-500/10
                  text-red-500

                  dark:bg-red-500/10
                  dark:text-red-400
                "
              >
                <AlertTriangle size={28} />
              </div>

              {/* Heading */}

              <h2
                className="
                  mt-5
                  text-2xl
                  font-bold
                  text-slate-900

                  dark:text-white
                "
              >
                Delete Account?
              </h2>

              {/* Description */}

              <p
                className="
                  mt-3
                  leading-6
                  text-slate-600

                  dark:text-slate-300
                "
              >
                Are you sure you want to permanently
                delete your HireMind account?
              </p>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-red-600

                  dark:text-red-400
                "
              >
                Your profile, preferences, and uploaded
                resumes will be permanently deleted.
                This action cannot be undone.
              </p>

              {/* Buttons */}

              <div className="mt-7 flex justify-end gap-3">

                {/* Cancel */}

                <button
                  type="button"
                  onClick={() =>
                    setShowDeleteModal(false)
                  }
                  disabled={deleting}
                  className="
                    cursor-pointer
                    rounded-xl
                    border
                    border-slate-300
                    bg-slate-100
                    px-5
                    py-3
                    font-medium
                    text-slate-700
                    transition

                    hover:bg-slate-200
                    hover:text-slate-900

                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-slate-300
                    dark:hover:bg-slate-700
                    dark:hover:text-white

                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                {/* Delete */}

                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-2
                    rounded-xl
                    bg-red-600
                    px-5
                    py-3
                    font-medium
                    text-white
                    transition

                    hover:bg-red-700

                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <Trash2 size={18} />

                  {deleting
                    ? "Deleting..."
                    : "Delete Account"}
                </button>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DangerZone;