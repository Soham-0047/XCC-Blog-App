import React from "react";
import PostContent from "../components/PostContent";

const Indexpage = () => {
  return (
    <>
      <section className="text-gray-400 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="my-8 divide-y-2 divide-gray-800 flex flex-col">
            <PostContent />
            <PostContent/>
          </div>
        </div>
      </section>
    </>
  );
};

export default Indexpage;
