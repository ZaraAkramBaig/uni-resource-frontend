
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';

export default function WaitingPage() {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">
              <Clock className="w-12 h-12 text-indigo-600" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-800">Your Application is Being Reviewed</h1>
        
        <p className="text-center text-gray-600">
          Thank you for registering. Our team is reviewing your information and will approve your account shortly.
        </p>
        
        <div className="space-y-3">
          
          <div className="flex justify-between text-sm text-gray-500">
            <span>Registration Submitted</span>
            <span>Approval Complete</span>
          </div>
        </div>
        
        <div className="space-y-4 pt-4">
          <div className="flex items-center space-x-3 text-gray-700">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>Registration completed successfully</span>
          </div>
          
          <div className="flex items-center space-x-3 text-gray-700">
            <Clock className="w-5 h-5 text-amber-500" />
            <span>Waiting for admin approval</span>
          </div>
          
          
        </div>
        
      </div>
    </div>
  );
}