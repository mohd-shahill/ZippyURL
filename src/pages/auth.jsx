import Login from "@/components/login";
import Signup from "@/components/signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlState } from "@/context";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();
  const {isAuthenticated, loading} = UrlState();

  // useEffect(() => {
  //   console.log("useEffect triggered", { isAuthenticated, loading });
  //   if (isAuthenticated && !loading) {
  //     navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
  //   }
  // }, [isAuthenticated, loading]);
  
  useEffect(() => {
    // console.log("useEffect triggered", { isAuthenticated, loading, longLink });
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [isAuthenticated, loading]);



  return (
    <div className="mt-18 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-bold">
        {
          longLink ? "Hold up! Let' s login first..." : "Login / Sign Up"
        } 
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login"><Login /></TabsContent>
        <TabsContent value="signup"><Signup /></TabsContent>
      </Tabs>

    </div>
  );
};

export default Auth;