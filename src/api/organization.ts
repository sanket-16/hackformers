export const getAllOrg = async (): Promise<
  {
    id: string;
    description: string;
    name: string;
    leaderId: string;
    images: string[];
  }[]
> => {
  const response = await fetch(
    `${import.meta.env.VITE_API}/org/getOrganizations`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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
  const response = await fetch(
    `${import.meta.env.VITE_API}/org/getOrganization/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data, response);
  return data;
};
