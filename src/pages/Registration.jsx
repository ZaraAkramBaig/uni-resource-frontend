import { useState } from 'react';
import { Building, Mail, Phone, Globe, MapPin, Calendar, Users, Award, FileText, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom'
import Footer from '../components/Footer';
import Navbar from '../components/navbar';

export default function InstitutionRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    year_established: '',
    institution_code: '',
    official_email: '',
    phone_number: '',
    alternate_phone: '',
    website_url: '',
    country: '',
    state_province: '',
    city: '',
    postal_code: '',
    full_address: '',
    num_departments: '',
    num_students_faculty: '',
    accreditation_details: '',
    additional_notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Institution registration submitted successfully!');
  };

  const InputField = ({ icon: Icon, label, name, type = 'text', placeholder, required = false }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          name={name}
          id={name}
          value={formData[name]}
          onChange={handleChange}
          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );

  const TextareaField = ({ icon: Icon, label, name, placeholder, required = false }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <textarea
          name={name}
          id={name}
          rows="3"
          value={formData[name]}
          onChange={handleChange}
          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
          placeholder={placeholder}
          required={required}
        ></textarea>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <Navbar condition={true} />
      {/* Form Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Institution Registration</h1>
          <p className="text-gray-600 mt-1">
            Please complete the form below to register your educational institution.
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6 md:p-8 border border-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Basic Information Section */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-4">
                  <InputField 
                    icon={Building} 
                    label="Institution Name" 
                    name="name" 
                    placeholder="Enter institution name"
                    required={true}
                  />

                  <InputField 
                    icon={Calendar} 
                    label="Year Established" 
                    name="year_established" 
                    type="number" 
                    placeholder="YYYY"
                  />

                  <InputField 
                    icon={FileText} 
                    label="Institution Code" 
                    name="institution_code" 
                    placeholder="Unique institution code"
                  />
                </div>
              </div>

              {/* Contact Information Section */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-4">
                  <InputField 
                    icon={Mail} 
                    label="Official Email" 
                    name="official_email" 
                    type="email" 
                    placeholder="official@institution.edu"
                    required={true}
                  />

                  <InputField 
                    icon={Phone} 
                    label="Phone Number" 
                    name="phone_number" 
                    placeholder="+1 (123) 456-7890"
                    required={true}
                  />

                  <InputField 
                    icon={Phone} 
                    label="Alternate Phone" 
                    name="alternate_phone" 
                    placeholder="+1 (123) 456-7890"
                  />

                  <InputField 
                    icon={Globe} 
                    label="Website URL" 
                    name="website_url" 
                    placeholder="https://www.institution.edu"
                  />
                </div>
              </div>

              {/* Location Information Section */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Location Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-4">
                  <InputField 
                    icon={MapPin} 
                    label="Country" 
                    name="country" 
                    placeholder="Enter country"
                    required={true}
                  />

                  <InputField 
                    icon={MapPin} 
                    label="State/Province" 
                    name="state_province" 
                    placeholder="Enter state or province"
                    required={true}
                  />

                  <InputField 
                    icon={MapPin} 
                    label="City" 
                    name="city" 
                    placeholder="Enter city"
                    required={true}
                  />

                  <InputField 
                    icon={MapPin} 
                    label="Postal Code" 
                    name="postal_code" 
                    placeholder="Enter postal code"
                    required={true}
                  />

                  <div className="md:col-span-2">
                    <TextareaField 
                      icon={MapPin} 
                      label="Full Address" 
                      name="full_address" 
                      placeholder="Enter complete street address"
                        required={true}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Additional Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-4">
                  <InputField 
                    icon={Building} 
                    label="Number of Departments" 
                    name="num_departments" 
                    type="number" 
                    placeholder="Enter total number of departments"
                  />

                  <InputField 
                    icon={Users} 
                    label="Number of Students & Faculty" 
                    name="num_students_faculty" 
                    type="number" 
                    placeholder="Total students and faculty members"
                  />

                  <div className="md:col-span-2">
                    <TextareaField 
                      icon={Award} 
                      label="Accreditation Details" 
                      name="accreditation_details" 
                      placeholder="Enter accreditation information if applicable"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <TextareaField 
                      icon={FileText} 
                      label="Additional Notes" 
                      name="additional_notes" 
                      placeholder="Any other information you would like to provide"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <Link to={"/waiting"}><button
                  type="submit"
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Register Institution
                </button>
                </Link>
              </div>
            </div>
          </form>
        </div>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}