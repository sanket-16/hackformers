const Page2 = () => {
  return (
    <div className="flex  md:flex-row flex-col-reverse  h-screen w-full items-center">
      <div className="w-1/2">
        <img className="rounded-md" src="/Page2.jpg" alt="hhhh" />
      </div>
      <div className="w-1/2  space-y-4 ">
        <h1 className="font-bold text-3xl">Stay Connected, Stay Informed</h1>
        <h2 className="text-xl">
          Communication is key to successful event planning. That's why
          EventEase provides various communication channels, including chat
          rooms and discussion forums, enabling real-time collaboration and
          information sharing. Whether you're discussing venue options or
          finalizing guest lists, stay connected with your team every step of
          the way.
        </h2>
      </div>
    </div>
  );
};

export default Page2;
