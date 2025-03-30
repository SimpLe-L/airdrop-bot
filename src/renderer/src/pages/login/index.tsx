import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Button onClick={() => navigate('/')}>Login</Button>
    </div>
  );
}

export default LoginPage;