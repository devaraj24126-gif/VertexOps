import { useEffect, useState } from "react";
import {
  getAllTickets,
  searchTickets,
  assignTicket,
  updateTicketStatus,
} from "../../services/ticketService";
import { getUsers } from "../../services/userService";
import { toast } from "react-toastify";

import "./AdminTickets.css";

function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  const loadTickets = async () => {
    try {
      const data = await getAllTickets();
      setTickets(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load tickets");
    }
  };

  const loadEmployees = async () => {
    try {
      const data = await getUsers();

      setEmployees(
        data.filter((user) => user.role === "EMPLOYEE")
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to load employees");
    }
  };

  useEffect(() => {
    loadTickets();
    loadEmployees();
  }, []);

  const handleSearch = async () => {
    try {
      const data = await searchTickets({
        status,
        priority,
        category,
      });

      setTickets(data);
      toast.success("Search completed");
    } catch (error) {
      console.error(error);
      toast.error("Search failed");
    }
  };

  const handleAssign = async (ticketId) => {
    const employeeId = selectedEmployee[ticketId];

    if (!employeeId) {
      toast.warning("Please select an employee");
      return;
    }

    try {
      await assignTicket(ticketId, Number(employeeId));

      await loadTickets();

      toast.success("Ticket assigned successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Assignment failed");
    }
  };

  const handleStatusUpdate = async (ticketId) => {
    const status = selectedStatus[ticketId];

    if (!status) {
      toast.warning("Please select a status");
      return;
    }

    try {
      await updateTicketStatus(ticketId, status);

      await loadTickets();

      toast.success("Status updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="admin-page">

      <h1>🎫 Admin Ticket Management</h1>

      <h3>Employees Loaded : {employees.length}</h3>

      <div className="search-card glass">

        <h2>Search Tickets</h2>

        <div className="search-row">

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="CLOSED">CLOSED</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">All Priority</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="Network">Network</option>
          </select>

          <button
            className="primary-btn"
            onClick={handleSearch}
          >
            Search
          </button>

          <button
            className="secondary-btn"
            onClick={loadTickets}
          >
            Reset
          </button>

        </div>

      </div>

      <table className="admin-table glass">

        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Category</th>
            <th>Created By</th>
            <th>Assigned To</th>
            <th>Assign Employee</th>
            <th>Assign</th>
            <th>New Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>

          {tickets.map((ticket) => (

            <tr key={ticket.id}>

              <td>{ticket.id}</td>

              <td>{ticket.title}</td>

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

              <td>{ticket.created_by}</td>

              <td>
                {ticket.assigned_to_name ?? "Unassigned"}
              </td>

              <td>

                <select
                  value={selectedEmployee[ticket.id] || ""}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      [ticket.id]: e.target.value,
                    })
                  }
                >
                  <option value="">Select Employee</option>

                  {employees.map((employee) => (
                    <option
                      key={employee.id}
                      value={employee.id}
                    >
                      {employee.full_name}
                    </option>
                  ))}
                </select>

              </td>

              <td>

                <button
                  className="action-btn"
                  onClick={() => handleAssign(ticket.id)}
                >
                  Assign
                </button>

              </td>

              <td>

                <select
                  value={selectedStatus[ticket.id] || ""}
                  onChange={(e) =>
                    setSelectedStatus({
                      ...selectedStatus,
                      [ticket.id]: e.target.value,
                    })
                  }
                >
                  <option value="">Select Status</option>
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="RESOLVED">RESOLVED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>

              </td>

              <td>

                <button
                  className="action-btn"
                  onClick={() =>
                    handleStatusUpdate(ticket.id)
                  }
                >
                  Update
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AdminTickets;