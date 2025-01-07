import React from "react";
import { SignIn } from "@clerk/nextjs";

const Login = () => {
  return (
    <div className="h-screen w-full flex items-center mt-12 flex-col">
      <h1 className="text-4xl text-gray-600 mb-5">Login</h1>
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/signup"
        signInUrl="/login"
        appearance={{
          elements: {
            socialButtonsBlockButton: {
              googleButton: {
                params: {
                  prompt: "select_account",
                  access_type: "offline",
                  response_type: "code"
                }
              }
            }
          }
        }}
      />
    </div>
  );
};

export default Login;
