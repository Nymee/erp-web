import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import type { SignUp } from "../../../interfaces/interfaces";

interface SignUpFormProps {
  onSubmit: (data: SignUp) => void;
  loading: boolean;
}

const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Company name is required"),
  email_id: Yup.string()
    .email("Invalid company email")
    .required("Company email is required"),
  mobile: Yup.string().required("Company mobile is required"),
  user_name: Yup.string().required("Admin name is required"),
  user_email: Yup.string()
    .email("Invalid admin email")
    .required("Admin email is required"),
  user_mobile: Yup.string().required("Admin mobile is required"),
});

const SignUpForm = ({ onSubmit, loading }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>({
    resolver: yupResolver(signUpSchema),
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Create Company Account
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Company Name"
              {...register("name")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Company Email"
              {...register("email_id")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email_id && (
              <p className="text-red-500 text-sm">{errors.email_id.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Company Mobile"
              {...register("mobile")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Admin Name"
              {...register("user_name")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.user_name && (
              <p className="text-red-500 text-sm">{errors.user_name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Admin Email"
              {...register("user_email")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.user_email && (
              <p className="text-red-500 text-sm">
                {errors.user_email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Admin Mobile"
              {...register("user_mobile")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.user_mobile && (
              <p className="text-red-500 text-sm">
                {errors.user_mobile.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
