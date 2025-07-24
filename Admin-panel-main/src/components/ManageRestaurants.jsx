import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get("/admin/restaurants")
      .then(res => {
        console.log(res.data); // Inspect the response structure
        setRestaurants(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 flex-grow overflow-auto">
      <h1 className="text-3xl font-semibold mb-6 text-orange-900">
        Manage Restaurants
      </h1>
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Rating</th>
              <th className="py-3 px-6 text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(restaurants) && restaurants.map((restaurant, idx) => (
              <tr
                key={restaurant.rdto?.id || idx}
                className="border-b last:border-b-0 hover:bg-orange-50"
              >
                <td className="py-3 px-6">{restaurant.rdto?.restaurantName}</td>
                <td className="py-3 px-6">{restaurant.rdto?.email}</td>
                <td className="py-3 px-6">{restaurant.rdto?.phone}</td>
                <td className="py-3 px-6">{restaurant.rdto?.rating ?? 'N/A'}</td>
                <td className="py-3 px-6">
                  {restaurant.adto
                    ? restaurant.adto.fulladdress
                    : 'No address'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRestaurants;