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
export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
        </div>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
                <CircleUserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                <input type="text" className="" />
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
