import { useNavigate } from "react-router-dom";
import TwoFASetup from "../components/TwoFASetup";

export default function Setup2FA() {
  const navigate = useNavigate();
  const handleSetupComplete = () => {
    navigate("/verify-2fa");
  };
  return <TwoFASetup onSetupComplete={handleSetupComplete} />;
}
