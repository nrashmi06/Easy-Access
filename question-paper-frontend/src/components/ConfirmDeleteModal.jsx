export default function ConfirmDeleteModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-base-100 rounded-xl shadow-xl max-w-sm w-full p-6">
        <h3 className="text-lg font-bold text-error mb-3">Confirm Delete</h3>
        <p className="text-sm text-base-content mb-4">
          Are you sure you want to delete this PDF? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="btn btn-ghost">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-error text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
