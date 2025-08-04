import React from "react";

const NewsletterBox = () => {
  const onSubmiyHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-center mx-6">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now to get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Subscribe Now to FitStyle and enjoy an exclusive 20% off your first
        purchase, plus stay updated on the latest trends and offers!
      </p>
      <form
        onSubmit={onSubmiyHandler}
        className=" w-full sm:w-1/2 flex  items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full outline-none sm:flex-1"
          type="email"
          placeholder="Enter your email"
          required
        ></input>
        <button
          type="submit"
          className="bg-black text-white text-sm px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;