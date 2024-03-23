export const createOrg = async ({
  description,
  name,
  images,
}: {
  name: string;
  description: string;
  images: string[];
}) => {
  const token = await localStorage.getItem("token");
  console.log(token);
  // const authorizationBearer = `${token.jwt.type} ${token.jwt.token}`;
  // // console.log(authorizationBearer);
  const response = await fetch(`${import.meta.env.VITE_API}/org/createOrg`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: String(token),
    },
    body: JSON.stringify({ name, description, images }),
  });
  const data = await response.json();
  console.log(data, response);
  return data;
};

type Organizer = {
  id: string;
  name: string;
  email: string;
  organizationId: string;
};

export const getOrg = async ({
  id,
}: {
  id: string;
}): Promise<{
  organization: {
    id: string;
    description: string;
    name: string;
    leaderId: string;
    images: string[];
    organizers: Organizer[];
  };
}> => {
  const token = await localStorage.getItem("token");
  console.log(token);
  // const authorizationBearer = `${token.jwt.type} ${token.jwt.token}`;
  // // console.log(authorizationBearer);
  const response = await fetch(
    `${import.meta.env.VITE_API}/org/getOrganization/${id}`,
    {
      method: "GET",
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

export const addOrganizerToOrg = async ({
  email,
  id,
}: {
  email: string;
  id: string;
}) => {
  const token = await localStorage.getItem("token");
  console.log(token);
  // const authorizationBearer = `${token.jwt.type} ${token.jwt.token}`;
  // // console.log(authorizationBearer);
  const response = await fetch(
    `${import.meta.env.VITE_API}/org/addOrganizer/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
      },
      body: JSON.stringify({ organizerEmail: email }),
    }
  );
  const data = await response.json();
  console.log(data, response);
  return data;
};
