import { motion } from "motion/react";
import {
  AlertCircle,
  CheckCircle,
  CircleUserRound,
  Eye,
  EyeOff,
  Loader,
  Lock,
  Mail,
} from "lucide-react";
import { useState } from "react";
export default function SignIn() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false
    });
    const [formState, setFormState] = useState({
        loading: false,
        errors: {},
        showPassword: false,
        success: false
    });
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) =>({
            ...prev,
            [name]: value
        }));
        if (formState.errors[name]) {
            setFormState((prev) => ({
                ...prev,
                errors: {...prev.errors, [name]: ''}
            }));
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
        </div>
        <form className="space-y-6">
            {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
                <CircleUserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                <input type="text" 
                name="username" 
                value={formData.username}
                
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    formState.errors.username ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`} placeholder="Enter your username"/>
            </div>
            {formState.errors.username && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1"/>
                    {formState.errors.username}
                </p>
            )}
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                <input type="password" name="password" />
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
