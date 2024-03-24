export const createEvent = async ({
  description,
  title,
  images,
  date,
  organizationId,
  location,
}: {
  title: string;
  description: string;
  images: string[];
  date: Date;
  location: string;
  organizationId: string;
}) => {
  const token = await localStorage.getItem("token");
  console.log(token);
  // const authorizationBearer = `${token.jwt.type} ${token.jwt.token}`;
  // // console.log(authorizationBearer);
  const response = await fetch(`${import.meta.env.VITE_API}/event/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: String(token),
    },
    body: JSON.stringify({
      title,
      description,
      images,
      date,
      organizationId,
      location,
    }),
  });
  const data = await response.json();
  console.log(data, response);
  return data;
};

export const addUserToEvent = async ({
  userEmail,
  id,
}: {
  userEmail: string;
  id: string;
}) => {
  const token = await localStorage.getItem("token");
  console.log(token);
  // const authorizationBearer = `${token.jwt.type} ${token.jwt.token}`;
  // // console.log(authorizationBearer);
  const response = await fetch(
    `${import.meta.env.VITE_API}/event/addUsertoEvent/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
      body: JSON.stringify({
        userEmail,
      }),
    }
  );
  const data = await response.json();
  console.log(data, response);
  return data;
};

[
  {
    id: "65ff0aa76ca035419bd9fc63",
    title: "sdfgbn",
    location: "sdfghjm",
    description: "sdvfgn nbm,",
    date: "2024-03-28T18:30:00.000Z",
    images: ["https://ucarecdn.com/bec39b32-7db6-4067-b99d-d1ead02668d6/"],
    participantsIds: [],
    userIds: ["65fdf2d55a88bea762d3ae4a"],
    organizationId: "65fec4e029b7a4cb8bac42dd",
    status: "PENDING",
  },
  {
    id: "65ff4030f6d7c8eea82d8843",
    title: "hi",
    location: "hi",
    description: "hi",
    date: "2024-03-29T18:30:00.000Z",
    images: ["https://ucarecdn.com/0fd16b75-0acd-40d1-9a24-3d97fa9a73e1/"],
    participantsIds: [],
    userIds: ["65fdf2d55a88bea762d3ae4a"],
    organizationId: "65fec4e029b7a4cb8bac42dd",
    status: "PENDING",
  },
];
export const getUserCreatedEvents = async (): Promise<{
  events: {
    id: string;
    title: string;
    location: string;
    description: string;
    date: Date;
    images: string[];
    participantIds: string[];
    userIds: string[];
    organizationId: string;
    status: "PENDING" | "ACCEPT" | "REJECT";
  }[];
}> => {
  const token = await localStorage.getItem("token");
  console.log(token);
  // const authorizationBearer = `${token.jwt.type} ${token.jwt.token}`;
  // // console.log(authorizationBearer);
  const response = await fetch(
    `${import.meta.env.VITE_API}/event/userCreatedEvents`,
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

export const getUserBookedEvents = async (): Promise<{
  events: {
    id: string;
    title: string;
    location: string;
    description: string;
    date: Date;
    images: string[];
    participantIds: string[];
    userIds: string[];
    organizationId: string;
    status: "PENDING" | "ACCEPT" | "REJECT";
  }[];
}> => {
  const token = await localStorage.getItem("token");
  console.log(token);
  // const authorizationBearer = `${token.jwt.type} ${token.jwt.token}`;
  // // console.log(authorizationBearer);
  const response = await fetch(
    `${import.meta.env.VITE_API}/event/participatedEvents`,
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

export const getValidEvents = async (): Promise<{
  events: {
    id: string;
    title: string;
    location: string;
    description: string;
    date: Date;
    images: string[];
    participantIds: string[];
    userIds: string[];
    organizationId: string;
    status: "PENDING" | "ACCEPT" | "REJECT";
  }[];
}> => {
  const token = await localStorage.getItem("token");
  console.log(token);
  // const authorizationBearer = `${token.jwt.type} ${token.jwt.token}`;
  // // console.log(authorizationBearer);
  const response = await fetch(
    `${import.meta.env.VITE_API}/event/validEvents`,
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

export const getEvent = async ({
  id,
}: {
  id: string;
}): Promise<{
  event: {
    id: string;
    title: string;
    location: string;
    description: string;
    date: Date;
    images: string[];
    participantIds: string[];
    userIds: string[];
    organizationId: string;
    status: "PENDING" | "ACCEPT" | "REJECT";
  };
}> => {
  const token = await localStorage.getItem("token");
  console.log(token);
  // const authorizationBearer = `${token.jwt.type} ${token.jwt.token}`;
  // // console.log(authorizationBearer);
  const response = await fetch(
    `${import.meta.env.VITE_API}/event/getEvent/${id}`,
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

export const addParticipantsToEvent = async ({
  eventId,
  userId,
}: {
  eventId: string;
  userId: string;
}) => {
  const token = await localStorage.getItem("token");
  console.log(token);
  // const authorizationBearer = `${token.jwt.type} ${token.jwt.token}`;
  // // console.log(authorizationBearer);
  const response = await fetch(
    `${import.meta.env.VITE_API}/event/addParticipants/${eventId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
      body: JSON.stringify({
        userId,
      }),
    }
  );
  const data = await response.json();
  console.log(data, response);
  return data;
};
