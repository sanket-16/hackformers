import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signUp, login } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
  return (
    <div className="flex h-full w-full items-center justify-center min-h-[90vh]">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: () =>
      login({
        email,
        password,
      }),
    onError: (error) => {
      toast.dismiss("loading");
      toast.error("Failed to login. Please try again!");
      console.log(error);
    },
    onSuccess: (data) => {
      toast.dismiss("loading");
      toast.success("Successfully logged in!");
      console.log(data);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Log in to your existing account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              defaultValue="san162002@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            toast.loading("Logging into your account...", { id: "loading" });
            loginMutation.mutateAsync();
          }}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};
const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signup = useMutation({
    mutationKey: ["signup"],
    mutationFn: () =>
      signUp({
        name,
        email,
        password,
      }),
    onError: (error) => {
      toast.dismiss("loading");
      toast.error("Failed to created user. Please try again!");
      console.log(error);
    },
    onSuccess: (data) => {
      toast.dismiss("loading");
      toast.success("Successfully created user. Please proceed to login!");
      console.log(data);
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>SignUp</CardTitle>
        <CardDescription>Create a new account.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            toast.loading("Creating your profile", { id: "loading" });
            signup.mutateAsync();
          }}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};
