export type SignUpProps = {
  email: string;
  name: string;
  password: string;
  type: "freelancer" | "client";
};

export type LoginProps = {
  email: string;
  password: string;
};

export const parseJwt = async (token: string) => {
  try {
    if (token) {
      //   console.log();
      //   console.log(JSON.parse(atob(token.split('.')[1])));
      return JSON.parse(atob(token.split(".")[1]));
    }
  } catch (e) {
    return null;
  }
};

export const signUp = async ({ email, name, password, type }: SignUpProps) => {
  const response = await fetch(`${import.meta.env.VITE_API}`, {
    method: "POST",
    body: JSON.stringify({ email, name, password, type }),
  });
  const data = await response.json();
  return data;
};

export const login = async ({ email, password }: LoginProps) => {
  const response = await fetch(`${import.meta.env.VITE_API}`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
};

// const loginDetails = async ({ type, phone_number }: LoginProps) => {
//   const response = await axios.post(`${import.meta.env.VITE_API}/auth/login`, {
//     mode,
//     phone_number: phone_number,
//   });
//   console.log(response);
//   return response.data;
// };

// export const generateOTP = async ({ user_uuid }: GenerateOTPProps) => {
//   const response = await axios.post(
//     `${import.meta.env.VITE_API}/auth/generate-otp`,
//     {
//       user_uuid,
//     }
//   );
//   console.log(response);
//   return response.data;
// };

// export const getUser = async () => {
//   const token = await JSON.parse(localStorage.getItem("token")!);
//   const authorizationBearer = `${token.jwt.type} ${token.jwt.token}`;
//   // console.log(authorizationBearer);
//   const response = await axios.post(
//     `${import.meta.env.VITE_API}/auth/me`,
//     {},
//     { headers: { Authorization: authorizationBearer } }
//   );
//   // console.log(response.data.data);
//   return response.data.data;
// };

// export default loginDetails;
