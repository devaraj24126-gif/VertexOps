import { useEffect, useState } from "react";
import {
  getAllTickets,
  searchTickets,
  assignTicket,
  updateTicketStatus,
} from "../../services/ticketService";

import { getUsers } from "../../services/userService";

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
      alert("Failed to load tickets");
    }
  };

  const loadEmployees = async () => {
    try {
      const data = await getUsers();

      const employeeList = data.filter(
        (user) => user.role === "EMPLOYEE"
      );

      setEmployees(employeeList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const data = await searchTickets({
        status,
        priority,
        category,
      });

      setTickets(data);
    } catch (error) {
      console.error(error);
      alert("Search failed");
    }
  };

  const handleAssign = async (ticketId) => {
    try {
      const employeeId = selectedEmployee[ticketId];

      if (!employeeId) {
        alert("Please select an employee");
        return;
      }

      await assignTicket(ticketId, Number(employeeId));

      alert("Ticket assigned successfully!");

      await loadTickets();
    } catch (error) {
      console.error(error);
      alert("Assignment failed");
    }
  };

  const handleStatusUpdate = async (ticketId) => {
    try {
      const status = selectedStatus[ticketId];

      if (!status) {
        alert("Please select a status");
        return;
      }

      await updateTicketStatus(ticketId, status);

      alert("Status updated successfully!");

      await loadTickets();
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    loadTickets();
    loadEmployees();
  }, []);

  return (
    <div>
      <h1>Admin Ticket Management</h1>

      <h3>Employees Loaded: {employees.length}</h3>

      <h2>Search Tickets</h2>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="OPEN">OPEN</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="RESOLVED">RESOLVED</option>
        <option value="CLOSED">CLOSED</option>
      </select>

      {" "}

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="">All Priority</option>
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>

      {" "}

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Hardware">Hardware</option>
        <option value="Software">Software</option>
        <option value="Network">Network</option>
      </select>

      {" "}

      <button onClick={handleSearch}>
        Search
      </button>

      {" "}

      <button onClick={loadTickets}>
        Reset
      </button>

      <hr />

      <table border="1" cellPadding="10">
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
              <td>{ticket.priority}</td>
              <td>{ticket.status}</td>
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
                  onClick={() =>
                    handleAssign(ticket.id)
                  }
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
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="RESOLVED">RESOLVED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </td>

              <td>
                <button
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