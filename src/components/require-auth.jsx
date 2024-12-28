import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {UrlState} from "@/context";
import {MoonLoader} from "react-spinners";

function RequireAuth({children}) {
  const navigate = useNavigate();

  const {loading, isAuthenticated} = UrlState();

  useEffect(() => {
    if (!isAuthenticated && loading === false) navigate("/auth");
  }, [isAuthenticated, loading]);

  if (loading) return <MoonLoader width={"100%"} color="#36d7b7" />;

  if (isAuthenticated) return children;
}

export default RequireAuth;