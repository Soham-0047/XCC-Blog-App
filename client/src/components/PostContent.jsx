import React from "react";

const PostContent = () => {
  return (
    <>
      <div className="py-8 px-8  flex flex-wrap md:flex-nowrap justify-center">
        <div className="md:w-64 md:mb-0 mb-6 mr-10  flex flex-col md:flex-shrink-0 ">
          <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
            className="object-contain"
            alt="text"
          />
        <span> Date Posted: <b className="mt-1 text-gray-500 text-sm">12 Jun 2019</b>
            </span>
        </div>
        <div className="md:flex-grow ">
          <h2 className="text-2xl font-medium text-black title-font mb-2">
            Bitters hashtag waistcoat fashion axe chia unicorn
          </h2>
           
          <p className="leading-relaxed lg:w-10/12 text-grey-300">
            Glossier echo park pug, church-key sartorial biodiesel vexillologist
            pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger
            bag selfies, poke vaporware kombucha lumbersexual pork belly
            polaroid hoodie portland craft beer.
          </p>
          <a className="text-indigo-400 inline-flex items-center mt-4">
            Learn More
            <svg
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default PostContent;
