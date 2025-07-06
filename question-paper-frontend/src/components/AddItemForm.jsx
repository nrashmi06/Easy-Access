// AddItemForm.jsx
import AddSubjectForm from "./AddSubjectForm";
import AddQPForm from "./AddQPForm";

export default function AddItemForm({ type = "subject", onClose }) {
  const handleSubmit = async (data) => {
    try {
      const endpoint = type === "subject" ? "/api/subjects" : "/api/question-papers";
      const res = await fetch(endpoint, {
        method: "POST",
        body: type === "subject" ? JSON.stringify(data) : data,
        headers: type === "subject"
          ? { "Content-Type": "application/json" }
          : undefined,
      });

      if (!res.ok) throw new Error("Failed to submit");

      alert(`${type === "subject" ? "Subject" : "Question Paper"} added!`);
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    } finally {
      onClose();
    }
  };

  if (type === "subject") {
    return <AddSubjectForm onClose={onClose} onSubmit={handleSubmit} />;
  }

  return <AddQPForm onClose={onClose}  />;
}
