
'use client';
import { useState } from 'react';
import { LucidePlus, LucideX } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/components/ui/use-toast';
import { getCurrentUser, getJwt } from '@/store';
import { 
  Status, 
  SurgeryTypes, 
  SurgeryCategories,
  useCreateNewSurgerieMutation
} from '@/types';
import CustomImageUploader from '@/components/common/Editable/UserImage';
import DoctorInfo from '@/components/common/Account/Doctor/DoctorInfo';

export default function DoctorView() {
  const user = useSelector(getCurrentUser);
  const jwt = useSelector(getJwt);
  const { toast } = useToast();
  const [createSurgery] = useCreateNewSurgerieMutation();

  // State for surgery creation
  const [isSurgeryModalOpen, setIsSurgeryModalOpen] = useState(false);
  const [surgeries, setSurgeries] = useState<any[]>([]);
  const [newSurgery, setNewSurgery] = useState({
    name: '',
    description: '',
    amount: '',
    status: Status.Inactive,
    surgeryType: SurgeryTypes.Rhinoplasty,
    surgeryCategory: SurgeryCategories.GeneralSurgeries,
    surgeryImage: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSurgery(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (file: File) => {
    setNewSurgery(prev => ({
      ...prev,
      surgeryImage: file
    }));
  };

  const handleCreateSurgery = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate inputs
      if (!newSurgery.name || !newSurgery.description || !newSurgery.amount) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Por favor complete todos los campos obligatorios'
        });
        return;
      }

      // Convert amount to number
      const amount = parseFloat(newSurgery.amount);
      if (isNaN(amount)) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'El monto debe ser un número válido'
        });
        return;
      }

      // Prepare mutation variables
      const surgeryVariables = {
        surgery: {
          name: newSurgery.name,
          description: newSurgery.description,
          amount: amount,
          status: newSurgery.status,
          type: newSurgery.surgeryType,
          category: newSurgery.surgeryCategory
        }
      };

      // Perform mutation
      const response = await createSurgery({
        variables: surgeryVariables
      });

      // Handle response
      if (response.data?.createNewSurgerie) {
        // Add new surgery to list
        setSurgeries(prev => [...prev, response.data?.createNewSurgerie]);

        // Show success toast
        toast({
          variant: 'success',
          title: 'Cirugía Creada',
          description: 'La cirugía se ha creado exitosamente'
        });

        // Reset form and close modal
        setNewSurgery({
          name: '',
          description: '',
          amount: '',
          status: Status.Inactive,
          surgeryType: SurgeryTypes.Rhinoplasty,
          surgeryCategory: SurgeryCategories.GeneralSurgeries,
          surgeryImage: null
        });
        setIsSurgeryModalOpen(false);
      } else {
        // Handle error
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No se pudo crear la cirugía'
        });
      }
    } catch (error) {
      console.error('Error creating surgery:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Ocurrió un error al crear la cirugía'
      });
    }
  };

  return (
    <div className="w-full min-h-screen">
      {/* Banner with gradient */}
      <div className="h-72 bg-gradient-to-b from-white to-drcuotasPrimary-bg" />

      {/* Main Container */}
      <div className="w-full h-full flex flex-col justify-center gap-4 px-8">
        {/* Profile header */}
        <div className="flex flex-col md:flex-row gap-4 -mt-16 items-center">
          {/* Doctor Image */}
          <div className="h-32 w-32 border-2 border-white bg-gray-200 rounded-full overflow-hidden shadow-md">
            <CustomImageUploader
              width={120}
              height={120}
              imageUrl={user.profile_picture ?? undefined}
            />
          </div>

          {/* Doctor Information */}
          <div className="w-full flex-1 text-center md:text-left">
            <h1 className="text-2xl lg:text-4xl uppercase font-black leading-tight tracking-tight text-drcuotasPrimary-text md:text-white">
              {user.first_name + ' ' + user.last_name}
            </h1>
            <p className="text-sm uppercase font-bold leading-tight tracking-tight text-drcuotasPrimary-text">
              Doctor Registrado
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 items-center">
            <DoctorInfo
              user={user}
              // Add placeholder handlers if not defined
              editInfoHandler={() => {}}
              cvHandler={() => {}}
              imagesHandler={() => {}}
            />
            
            {/* New Surgery Creation Button */}
            <button 
              onClick={() => setIsSurgeryModalOpen(true)}
              className="flex items-center gap-2 bg-drcuotasPrimary-text text-white w-full h-14 p-4 border-2 rounded-xl transition-colors"
            >
              <LucidePlus  />
              <span className='w-full'>
                Crear Cirugía
              </span>
            </button>
          </div>
        </div>

        {/* Surgeries List */}
        {surgeries.length > 0 && (
          <div className='w-full h-full'>
            <div className="w-full h-14 flex flex-col gap-4">
              {surgeries.map((surgery, index) => (
                <div 
                  key={index} 
                  className="border rounded-lg p-4 shadow-md bg-white"
                >
                  <h3 className="text-xl font-semibold mb-2">{surgery.name}</h3>
                  <p className="text-gray-600 mb-2">{surgery.description}</p>
                  <div className="flex justify-between">
                    <span className="font-bold">Monto: ${surgery.amount}</span>
                    <span className="text-sm text-gray-500">{surgery.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>



      {/* Surgery Creation Modal */}
      {isSurgeryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            {/* Close Button */}
            <button 
              onClick={() => setIsSurgeryModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <LucideX className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold">Cirugía</h2>
            
            <form onSubmit={handleCreateSurgery} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block mb-2 font-medium">Nombre de la Cirugía</label>
                <input 
                  type="text"
                  name="name"
                  value={newSurgery.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Nombre de la cirugía"
                  required
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block mb-2 font-medium">Descripción</label>
                <input 
                  type="text"
                  name="description"
                  value={newSurgery.description}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Descripción de la cirugía"
                  required
                />
              </div>

              {/* Amount Input */}
              <div>
                <label className="block mb-2 font-medium">Monto</label>
                <input 
                  type="number"
                  name="amount"
                  value={newSurgery.amount}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Monto de la cirugía"
                  required
                />
              </div>

              {/* Surgery Type Select */}
              <div>
                <label className="block mb-2 font-medium">Tipo de Cirugía</label>
                <select
                  name="surgeryType"
                  value={newSurgery.surgeryType}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2"
                >
                  {Object.values(SurgeryTypes).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Surgery Category Select */}
              <div>
                <label className="block mb-2 font-medium">Categoría de Cirugía</label>
                <select
                  name="surgeryCategory"
                  value={newSurgery.surgeryCategory}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2"
                >
                  {Object.values(SurgeryCategories).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Status Select */}
              <div>
                <label className="block mb-2 font-medium">Estado</label>
                <select
                  name="status"
                  value={newSurgery.status}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2"
                >
                  {Object.values(Status).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-drcuotasPrimary-text text-white py-2 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Crear Cirugía
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}