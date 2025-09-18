import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import API from "../api/request";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string }) => {
    try {
      await API.post("/auth/forgotPassword", { email: values.email });
      toast.success("Password reset code sent to your email!");
      navigate("/verifyCode", { state: { email: values.email } });
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-[#171A1F] mb-3">
          Forget Password
        </h2>

        {/* Subtitle */}
        <h5 className="text-center text-base leading-6 font-normal text-[#565D6D] mb-6">
          Enter your registered email address below to receive password reset
          instructions.
        </h5>

        {/* Form */}
        <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-3">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 flex items-center justify-center font-inter text-sm font-medium text-white bg-[#F36451] rounded-md hover:bg-[#EF2E14] active:bg-[#D3260F] disabled:opacity-40 transition"
              >
                {isSubmitting ? "Sending..." : "Send Reset Instructions"}
              </button>

              {/* Remembered Password */}
              <div className="text-center text-sm text-[#565D6D] mt-2">
                Remembered your password?{" "}
                <Link
                  to="/login"
                  className="ml-1 text-[#F36653] font-medium hover:underline"
                >
                  Login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
