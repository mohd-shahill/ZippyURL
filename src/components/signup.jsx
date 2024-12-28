import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MoonLoader } from 'react-spinners';
import Error from './error';
import * as Yup from 'yup';
import useFetch from '@/hooks/use-fetch';
import { signup } from '@/db/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '@/context';

const SignUp = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const { data, error = {}, loading, fn: fnSignUp } = useFetch(signup, formData);
  const { fetchUser } = UrlState();


  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSignUp = async () => {
    setErrors([]); // Clear previous errors
    try {
      const schema = Yup.object().shape({
        name: Yup.string().
          required("Name is reqiured"),

        email: Yup.string()
          .email("Invalid E-mail")
          .required("E-mail is required"),

        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),

        profile_pic: Yup.mixed()
          .required("Profile picture is required")
      });

      await schema.validate(formData, { abortEarly: false });

      // Proceed with SignUp if validation passes
      fnSignUp();
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };



  useEffect(() => {
    if (error === null && data) {
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);





  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven&rsquo;t already
        </CardDescription>
        {error && <Error message={error?.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={handleInputChange}
          />
        </div>
        {errors.name && <Error message={errors.name} />}
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
        </div>
        {errors.email && <Error message={errors.email} />}
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>
        {errors.password && <Error message={errors.password} />}
        <div className="space-y-1">
          <input
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
        {errors.profile_pic && <Error message={errors.profile_pic} />}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignUp} className="w-full">
          {loading ? <MoonLoader size={18} color="#1e293b" /> : 'Create Account'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;


// 1.04.11w3