import React, { useState, useEffect } from "react";
import api from "../api";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
        const statusOptions = ["Preparing", "Delivered", "Cancelled"];

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/admin/orders");
        const mapped = res.data.map((o) => ({
          id: o.id,
          user: o.customer ? (o.customer.firstName ? `${o.customer.firstName} ${o.customer.lastName || ''}`.trim() : o.customer.username) : "",
          restaurant: o.restaurant ? o.restaurant.name : "",
          amount: o.amount,
          status: o.status,
          date: o.createdAt ? o.createdAt.split("T")[0] : "",
        }));
        setOrders(mapped);
      } catch (err) {
        // handle error
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/admin/orders/${id}`, { status: newStatus });
          setOrders((prev) =>
            prev.map((order) =>
              order.id === id ? { ...order, status: newStatus } : order
            )
          );
    } catch (err) {
      // handle error
    }
        };

        return (
          <div className="p-6 flex-grow overflow-auto">
            <h1 className="text-3xl font-semibold mb-6 text-orange-900">
              Manage Orders
            </h1>
            <div className="overflow-x-auto rounded-lg shadow bg-white">
              <table className="min-w-full">
                <thead className="bg-orange-600 text-white">
                  <tr>
                    <th className="py-3 px-6 text-left">Order ID</th>
                    <th className="py-3 px-6 text-left">User</th>
                    <th className="py-3 px-6 text-left">Restaurant</th>
                    <th className="py-3 px-6 text-left">Amount</th>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(({ id, user, restaurant, amount, status, date }) => (
                    <tr
                      key={id}
                      className="border-b last:border-b-0 hover:bg-orange-50"
                    >
                      <td className="py-3 px-6">{id}</td>
                      <td className="py-3 px-6">{user}</td>
                      <td className="py-3 px-6">{restaurant}</td>
                      <td className="py-3 px-6">${amount.toFixed(2)}</td>
                      <td className="py-3 px-6">{date}</td>
                      <td
                        className={`py-3 px-6 font-semibold ${
                          status === "Delivered"
                            ? "text-green-600"
                            : status === "Cancelled"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {status}
                      </td>
                      <td className="py-3 px-6 text-center space-x-2">
                        {statusOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => updateStatus(id, option)}
                            disabled={status === option}
                            className={`text-sm px-2 py-1 rounded ${
                              status === option
                                ? "bg-orange-300 cursor-not-allowed"
                                : "bg-orange-600 hover:bg-orange-700 text-white"
                            }`}
                            title={`Set status to ${option}`}
                          >
                            {option}
                          </button>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      export default ManageOrders;
     
      