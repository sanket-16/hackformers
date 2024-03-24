const Page1 = () => {
  return (
    <>
      <div className="flex  md:flex-row flex-col-reverse  h-screen w-full items-center ">
        <div className="w-1/2">
          <h1 className="font-bold text-3xl">
            Welcome to EventEase: Your Ultimate Event Planning and Discovery
            Platform
          </h1>

          <h1 className="text-bold text-2xl mt-4">Collaborative Event Planning Made Easy</h1>
          <h2>
            Join forces with your friends, colleagues, or community groups to
            plan unforgettable events seamlessly. With EventEase's suite of
            collaborative tools, you can delegate tasks, create shared to-do
            lists, and schedule activities effortlessly. Say goodbye to
            scattered emails and confusing spreadsheets – streamline your event
            planning process today!
          </h2>
        </div>
        <div className="w-1/2">
            <img  className="rounded-md" src="/Page1.jpg" alt="hhhh" />
        </div>
      </div>
    </>
  );
};

export default Page1;
