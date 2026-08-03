import { useEffect, useState } from "react";
import {
  getMyTickets,
  createTicket,
} from "../../services/ticketService";

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
      alert("Failed to load tickets");
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

      alert("Ticket created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create ticket");
    }
  };

  return (
    <div>
      <h1>My Tickets</h1>

      <form onSubmit={handleCreate}>
        <h2>Create Ticket</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          minLength={5}
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <textarea
          placeholder="Description"
          value={description}
          minLength={10}
          required
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <br />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <br />
        <br />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
          <option value="Network">Network</option>
        </select>

        <br />
        <br />

        <button type="submit">
          Create Ticket
        </button>
      </form>

      <hr />

      <table border="1" cellPadding="10">
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
              <td>{ticket.priority}</td>
              <td>{ticket.status}</td>
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