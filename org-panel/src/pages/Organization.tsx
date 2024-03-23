import { Button } from "@/components/ui/button";

const Organization = () => {
  return (
    <>
      <div className="flex w-full flex-col  px-10 ">
        <h1 className="text-4xl font-bold text-center ">Organizers</h1>

        <div className="grid space-y-5 overflow-hidden overflow-y-scroll	h-96 mt-3">
          {Array(29)
            .fill("")
            .map((_, index) => (
              <>
                <div>
                  <h1>Email: omkar@gmail.com</h1>
                  <h3>Name: omkar</h3>
                  <div className="flex space-x-4">
                    <Button>Accept</Button>
                    <Button>Reject</Button>
                  </div>
                </div>
              </>
              // mahiti nai kai add karaiche ahai teh
            ))}
        </div>
      </div>
    </>
  );
};

export default Organization;
