import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import { ToastContainer, toast } from "react-toastify";
import { toast } from "react-toastify";
import auth from "../firebase.init";

const BookingModal = ({ modal, setModal }) => {
  const { name, _id, description, price, minimumQuantity, availableQuantity } =
    modal;
  const [user, loading, error] = useAuthState(auth);
  const handleBooking = (event) => {
    event.preventDefault();
    console.log(name, _id);

    const booking = {
      itemId: _id,
      itemName: name,
      itemDescription: description,
      itemPrice: price,
      itemMinimumQuantity: minimumQuantity,
      itemAvailableQuantity: availableQuantity,
      email: user.email,
      phone: event.target.phone.value,
      address: event.target.address.value,
    };

    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        toast("booking added successfully");
        setModal(null);
      });
  };
  return (
    <div>
      <input type="checkbox" id="booking-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="font-bold text-lg">{name}</h3>
          <>
            <form
              onSubmit={handleBooking}
              className="grid grid-cols-1 gap-3 justify-items-center mt-2"
            >
              <input
                type="text"
                name="name"
                disabled
                value={user?.displayName || ""}
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="email"
                name="email"
                disabled
                value={user?.email || ""}
                className="input input-bordered w-full max-w-xs"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-secondary w-full max-w-xs"
              />
            </form>
          </>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;