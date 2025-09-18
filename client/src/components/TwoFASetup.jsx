import { useEffect, useState } from "react";
import { setup2FA } from "../service/authApi";

const TwoFASetup = ({ onSetupComplete }) => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState({});

  const copyClipboard = async () => {
    await navigator.clipboard.writeText(response.secret);
    setMessage("Secret Copied to clipboard");
  };

  const fetchQRCode = async () => {
    const { data } = await setup2FA();
    setResponse(data);
  };

  useEffect(() => {
    fetchQRCode();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md w-full max-w-sm mx-auto">
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">
          Turn on 2FA Verification
        </h2>
      </div>
      <hr className="text-gray-200 mt-6 mb-6" />
      <p className="px-6 text-center text-gray-600 text-lg font-light">
        Scan the QR code below with your authenticator app
      </p>
      <div className="p-6">
        <div className="flex justify-center">
          <img
            src={response.qrcode}
            alt="2FA QR Code"
            className="mv-4 border-rounded-md"
          />
        </div>
        <div className="flex items-center my-3">
          <div className="border-t border-1 border-gray-200 flex-grow"></div>
          <div className="text-gray-600 text-sm font-light px-2">
            Or enter the code manually
          </div>
          <div className="border-t border-1 border-gray-200 flex-grow"></div>
        </div>
        <div className="mb-6">
          {message && (
            <p className="text-sm text-green-600 text-mb-3">{message}</p>
          )}
          <input
            readOnly
            defaultValue=""
            value={response.secret}
            className="w-full border rounded mt-2 text-xs text-gray-600 p-4"
            type="text"
            onClick={copyClipboard}
          />
        </div>
        <button
          onClick={onSetupComplete}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Continue to verification.
        </button>
      </div>
    </div>
  );
};

export default TwoFASetup;
