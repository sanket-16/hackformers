export const updateEventStatus = async ({
  id,
  status,
}: {
  id: string;
  status: "ACCEPT" | "REJECT" | "PENDING";
}) => {
  const token = await localStorage.getItem("token");
  console.log(token);
  // const authorizationBearer = `${token.jwt.type} ${token.jwt.token}`;
  // // console.log(authorizationBearer);
  const response = await fetch(
    `${import.meta.env.VITE_API}/event/updateStatus/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
      body: JSON.stringify({ status }),
    }
  );
  const data = await response.json();
  console.log(data, response);
  return data;
};

type Event = {
  id: string;
  title: string;
  location: string;
  description: string;
  date: Date;
  images: string[];
  participantIds: string[];
  userIds: string[];
  organizationId: string;
  status: "ACCEPT" | "REJECT" | "PENDING";
  organization: {
    id: string;
    description: string;
    name: string;
    leaderId: string;
    images: string[];
  };
};

export const getEventsByOrg = async ({
  id,
}: {
  id: string;
}): Promise<{
  events: Event[];
}> => {
  console.log("hit");
  const token = await localStorage.getItem("token");
  console.log(token);

  const response = await fetch(
    `${import.meta.env.VITE_API}/event/orgEvents/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
    }
  );
  const data = await response.json();
  console.log(data, response);
  return data;
};
