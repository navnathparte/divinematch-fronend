import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import API from "../api/request";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyCodeSchema = Yup.object().shape({
  code: Yup.string()
    .length(6, "Code must be 6 digits")
    .required("Code is required"),
});

export default function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email: string })?.email || "";

  const handleSubmit = async (values: { code: string }) => {
    try {
      await API.post("/auth/verify-token", { email, resetCode: values.code });
      toast.success("Code verified! Enter new password.");
      navigate("/resetPassword", { state: { email } });
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Invalid code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify Code
        </h2>

        <Formik
          initialValues={{ code: "" }}
          validationSchema={VerifyCodeSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="text"
                name="code"
                placeholder="Enter code"
                className="w-full p-3 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="code"
                component="div"
                className="text-red-500 text-sm mb-4"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Verifying..." : "Verify Code"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
