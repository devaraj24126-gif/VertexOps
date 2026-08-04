import { useEffect, useState } from "react";
import {
  getMyTickets,
  createTicket,
} from "../../services/ticketService";
import { toast } from "react-toastify";

import "./Tickets.css";

function Tickets() {
  const [tickets, setTickets] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [category, setCategory] = useState("Hardware");

  const loadTickets = async () => {
    try {
      const data = await getMyTickets();
      setTickets(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load tickets");
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createTicket({
        title,
        description,
        priority,
        category,
      });

      setTitle("");
      setDescription("");
      setPriority("LOW");
      setCategory("Hardware");

      await loadTickets();

      toast.success("Ticket created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create ticket");
    }
  };

  return (
    <div className="ticket-page">

      <h1>🎫 My Tickets</h1>

      <form
        className="ticket-form glass"
        onSubmit={handleCreate}
      >
        <h2>Create Ticket</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          minLength={5}
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          minLength={10}
          required
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
          <option value="Network">Network</option>
        </select>

        <button
          className="btn"
          type="submit"
        >
          Create Ticket
        </button>
      </form>

      <table className="ticket-table glass">

        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Category</th>
            <th>Assigned To</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>

          {tickets.map((ticket) => (

            <tr key={ticket.id}>

              <td>{ticket.id}</td>

              <td>{ticket.title}</td>

              <td>{ticket.description}</td>

              <td>
                <span className={ticket.priority.toLowerCase()}>
                  {ticket.priority}
                </span>
              </td>

              <td>
                <span
                  className={
                    ticket.status === "IN_PROGRESS"
                      ? "progress"
                      : ticket.status.toLowerCase()
                  }
                >
                  {ticket.status}
                </span>
              </td>

              <td>{ticket.category}</td>

              <td>
                {ticket.assigned_to_name ?? "Unassigned"}
              </td>

              <td>
                {new Date(ticket.created_at).toLocaleString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Tickets;